/*
로그인 페이지
- 로그인 폼, 문의 버튼, 경고 알림 모달
- 로그인 페이지 진입 시 user/item 초기화
- 다른 페이지에서 온 경고 메세지 모달로 표시
*/

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertModal from '@/components/alert_modal';
import Button from '@/components/button';
import LoginForm from './login_form';
import { PageContainer } from '@/components/page_container';
import { INFO_MESSAGES } from '@/constants/messages';
import { format_message } from '@/utils/format_message';
import './login.css';

function LoginPage() {
	const [message, set_message] = useState('');
	const [is_open, set_is_open] = useState(false);
	const location = useLocation();
	const redirect_message = location?.state?.message || '';

	//페이지 진입 시 기존 로그인 정보 초기화
	useEffect(() => {
		localStorage.removeItem('user');
		localStorage.removeItem('item');
	}, []);

	//다른 페이지에서 온 경고 메세지 자동 표시
	useEffect(() => {
		if (redirect_message) {
			set_message(redirect_message);
			set_is_open(true);
		}
	}, [redirect_message]);

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
