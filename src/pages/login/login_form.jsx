/*
로그인 폼
- 학번/비밀번호 입력 받은 후, 서버로 로그인 요청
- 로그인 3회 실패 시 60초간 입력 잠금(use_login_limiter)
- 요청 중 중복 클릭 불가(loading)
*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/auth_api';
import Button from '@/components/button';
import InputField from '@/components/input_field';
import Message from '@/components/message';
import { ERROR_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
import { use_login_limiter } from '@/hooks/use_login_limiter';
import { format_message } from '@/utils/format_message';
import './login.css';

function LoginForm() {
	const navigate = useNavigate();
	const [user_id, set_user_id] = useState('');
	const [pwd, set_pwd] = useState('');
	const [error, set_error] = useState('');
	const [loading, set_loading] = useState(false);
	const { is_locked, check, add_attempt, lock_temporarily, remaining_time, attempts } =
		use_login_limiter();

	//잠금 해제 시 에러 메세지 자동 삭제
	useEffect(() => {
		if (!is_locked) {
			set_error(null);
		}
	}, [is_locked]);

	//로그인 요청
	const handle_submit = async (e) => {
		e.preventDefault();

		//잠금, 로딩 중 중복 처리 막음
		if (is_locked || loading) return;
		set_loading(true);
		set_error(null);

		try {
			const res = await login(user_id, pwd);
			console.log(res);

			if (res.success) {
				const token = res.data.token;
				if (token) {
					localStorage.setItem('token', token);
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
				} else set_error(ERROR_MESSAGES.token_not_find);
				localStorage.setItem('user', JSON.stringify(res.data.name));
				navigate('/main');
			} else {
				if (res.code === 400) {
					//학번, 비밀번호 오류
					set_error(
						format_message(ERROR_MESSAGES.invalid_login, {
							count: 3 - attempts,
						})
					);
					add_attempt();
					if (check()) {
						lock_temporarily();
						set_loading(false);
						return;
					}
					set_loading(false);
					return;
				} else if (res.code === 401) {
					//학번 없음
					set_error(ERROR_MESSAGES.user_not_found);
				} else {
					//알 수 없는 오류
					set_error(ERROR_MESSAGES.unknown);
				}
				set_loading(false);
			}
		} catch (err) {
			//입력값 형식 오류
			if (err.code === 422) {
				set_error(
					format_message(ERROR_MESSAGES.invalid_syntax, {
						count: 3 - attempts,
					})
				);
				add_attempt();
				if (check()) {
					lock_temporarily();
					set_loading(false);
					return;
				}
				set_loading(false);
				return;
			} else {
				set_error(err.message);
				set_loading(false);
			}
		}
		set_loading(false);
	};

	//잠금 상태/남은 시간 메세지
	const render_lock_message = () => {
		if (!is_locked || !remaining_time) return null;

		const msg = format_message(INFO_MESSAGES.too_many_attempts, {
			time: remaining_time.toString(),
		});

		return <Message type="info" text={msg} />;
	};

	return (
		<form onSubmit={handle_submit}>
			<div className="login-input-container">
				<InputField
					type="text"
					value={user_id}
					onChange={(e) => set_user_id(e.target.value)}
					placeholder="학번 입력"
				/>
				<InputField
					type="password"
					value={pwd}
					onChange={(e) => set_pwd(e.target.value)}
					placeholder="비밀번호 입력"
				/>
			</div>
			<Button type="submit" class_name="default-button" disabled={is_locked || loading}>
				로그인
			</Button>
			<Message type="error" text={error} class_name="error" />
			{render_lock_message()}
		</form>
	);
}

export default LoginForm;
