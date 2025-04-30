import LoginForm from './login_form';
import './login.css';
import { useEffect } from 'react';
import { PageContainer } from '@/components/page_container';
function LoginPage() {
	useEffect(() => {
		localStorage.removeItem('user');
		localStorage.removeItem('item');
	}, []);

	return (
		<PageContainer title="SSCCtal" title_color="#2e5bff">
			<div className="login-label">유세인트 계정을 입력하세요</div>
			<LoginForm />
		</PageContainer>
	);
}

export default LoginPage;
