import React, { useState } from 'react';
import { loginRequest } from '@/api/auth-api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import Message from '../../components/message';
import { use_login_limiter } from '@/hooks/use-login-limiter';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { verifyUserBySchoolNumber } from '@/api/user-api';

function LoginForm() {
	const navigate = useNavigate();
	const [user_id, set_user_id] = useState('');
	const [pwd, set_pwd] = useState('');
	const [message, set_message] = useState('');
	const [error, set_error] = useState('');
	const {
		is_locked,
		check,
		add_attempt,
		lock_temporarily,
		remaining_time,
		attempts,
		set_attempts,
	} = use_login_limiter();

	const handle_submit = async (e) => {
		e.preventDefault();
		set_error(null);
		set_message('');

		if (is_locked) {
			return;
		}

		try {
			const res = await loginRequest(user_id, pwd);
			const match = res.match(/sToken=([^&]+)&/);

			if (!match) {
				add_attempt();

				if (check()) {
					lock_temporarily();
					return;
				}
				set_error(ERROR_MESSAGES.invalid_login.replace('{count}', 3 - attempts));
				return;
			}

			set_attempts(0);
			console.log('sToken:', match[1]);

			try {
				const user = await verifyUserBySchoolNumber(user_id);
				console.log('유저 확인됨:', user);
				set_message(SUCCESS_MESSAGES.login_success);
				navigate('/main', { state: { user } });
			} catch (err) {
				if (err.response?.status === 404) {
					set_error(ERROR_MESSAGES.user_not_found || '등록되지 않은 유저입니다');
				} else {
					set_error(`${ERROR_MESSAGES.login_fail}: ${err.message}`);
				}
			}
		} catch (err) {
			set_error(`${ERROR_MESSAGES.login_fail}: ${err.message}`);
		}
	};

	const render_lock_message = () => {
		if (!is_locked || !remaining_time) return null;

		const msg = INFO_MESSAGES.too_many_attempts.replace('{time}', remaining_time.toString());

		return <Message type="info" text={msg} />;
	};

	return (
		<form onSubmit={handle_submit}>
			<InputField
				type="text"
				value={user_id}
				onChange={(e) => set_user_id(e.target.value)}
				placeholder="학번 입력"
				class_name="student-id"
			/>
			<InputField
				type="password"
				value={pwd}
				onChange={(e) => set_pwd(e.target.value)}
				placeholder="비밀번호 입력"
				class_name="password"
			/>
			<Button type="submit" class_name="login-button" disabled={is_locked}>
				로그인
			</Button>
			<Message type="success" text={message} class_name="success" />
			<Message type="error" text={error} class_name="error" />
			{render_lock_message()}
		</form>
	);
}

export default LoginForm;
