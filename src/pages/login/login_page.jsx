import LoginForm from './login_form';
import './login.css';
import { useEffect } from 'react';

function LoginPage() {
	useEffect(() => {
		localStorage.removeItem('user');
		console.log('로그아웃 처리');
	}, []);

	return (
		<div className="login-container">
			<div className="login-title">SSCCtal</div>
			<div className="login-label">유세인트 계정을 입력하세요</div>
			<LoginForm />
		</div>
	);
}

export default LoginPage;
