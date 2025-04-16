import LoginForm from './login-form';
import './login.css';

function LoginPage() {
	return (
		<div className="login-container">
			<div className="title">SCLibrary</div>
			<div className="label">유세인트 계정을 입력하세요</div>
			<LoginForm />
		</div>
	);
}

export default LoginPage;
