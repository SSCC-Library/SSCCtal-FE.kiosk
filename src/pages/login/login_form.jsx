import React, { useState } from 'react';
import { ERROR_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
import InputField from '@/components/input_field';
import Button from '@/components/button';
import Message from '@/components/message';
import { use_login_limiter } from '@/hooks/use_login_limiter';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/user_api';

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
			const res = await login(user_id, pwd);

			if (res.success) {
				localStorage.setItem('user', JSON.stringify(res));
				navigate('/main');
			} else {
				if (res.code === 400) {
					add_attempt();

					if (check()) {
						lock_temporarily();
						return;
					}
					set_error(ERROR_MESSAGES.invalid_login.replace('{count}', 3 - attempts));
					return;
				} else if (res.code === 401) {
					set_error(ERROR_MESSAGES.user_not_found);
				} else {
					set_error(ERROR_MESSAGES.unknown);
				}
			}
		} catch (err) {
			set_error(
				`${ERROR_MESSAGES.login_fail}: ${err?.message || '서버와 통신 중 오류 발생'}`
			);
		}
	};

	const render_lock_message = () => {
		if (!is_locked || !remaining_time) return null;

		const msg = INFO_MESSAGES.too_many_attempts.replace('{time}', remaining_time.toString());

		return <Message type="info" text={msg} />;
	};

	return (
		<form onSubmit={handle_submit}>
			<div className="input-container">
				<InputField
					type="text"
					value={user_id}
					onChange={(e) => set_user_id(parseInt(e.target.value))}
					placeholder="학번 입력"
				/>
				<InputField
					type="password"
					value={pwd}
					onChange={(e) => set_pwd(e.target.value)}
					placeholder="비밀번호 입력"
				/>
			</div>
			<Button type="submit" class_name="default-button" disabled={is_locked}>
				로그인
			</Button>
			<Message type="success" text={message} class_name="success" />
			<Message type="error" text={error} class_name="error" />
			{render_lock_message()}
		</form>
	);
}

export default LoginForm;
