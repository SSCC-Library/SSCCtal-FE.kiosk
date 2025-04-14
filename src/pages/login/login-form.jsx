import React, { useState } from 'react';
import { loginRequest } from '@/api/auth.api';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, INFO_MESSAGES } from '@/constants/messages';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import Message from '../../components/message';
import { use_login_limiter } from '@/hooks/use-login-limiter';
import './login-form.css';

function LoginForm() {
	const [user_id, set_user_id] = useState('');
	const [pwd, set_pwd] = useState('');
	const [message, set_message] = useState('');
	const [error, set_error] = useState('');
	const { is_locked, check, add_attempt, lock_temporarily, remaining_time } = use_login_limiter();

	const handle_submit = async (e) => {
		e.preventDefault();
		set_error(null);
		set_message('');

		if (is_locked) {
			return;
		}

		if (check()) {
			lock_temporarily();
			return;
		}

		add_attempt(); // 시도 카운트 증가

		try {
			const res = await loginRequest(user_id, pwd);
			const match = res.match(/sToken=([^&]+)&/);

			if (!match) {
				set_error(ERROR_MESSAGES.invalid_login);
				return;
			}

			set_message(SUCCESS_MESSAGES.login_success);
			console.log('sToken:', match[1]);
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
		<form className="login-container" onSubmit={handle_submit}>
			<div className="title">SCLibrary</div>

			<div className="label">유세인트 계정을 입력하세요</div>
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
