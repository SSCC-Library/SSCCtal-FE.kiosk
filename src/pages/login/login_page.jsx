import LoginForm from './login_form';
import './login.css';
import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/page_container';
import Button from '@/components/button';
import { format_message } from '@/utils/format_message';
import { INFO_MESSAGES } from '@/constants/messages';
import AlertModal from '@/components/alert_modal';

function LoginPage() {
	useEffect(() => {
		localStorage.removeItem('user');
		localStorage.removeItem('item');
	}, []);
	const [message, set_message] = useState('');
	const [is_open, set_is_open] = useState(false);

	return (
		<PageContainer title="SSCCtal" title_color="#2e5bff">
			<div className="login-label">유세인트 계정을 입력하세요</div>
			<LoginForm />
			<Button
				onClick={() => {
					set_message(format_message(INFO_MESSAGES.alert_admin));
					set_is_open(true);
				}}
				class_name="admin-button"
			>
				문의하기
			</Button>
			{is_open && (
				<AlertModal
					message={message}
					on_close={() => {
						set_message('');
						set_is_open(false);
					}}
				/>
			)}
		</PageContainer>
	);
}

export default LoginPage;
