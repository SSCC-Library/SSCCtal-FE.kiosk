/*
메인 페이지
- 비로그인 접근 시 로그인 페이지로 이동(use_user)
*/

import { useState } from 'react';
import AlertModal from '@/components/alert_modal';
import Button from '@/components/Button';
import { PageContainer } from '@/components/page_container';
import { INFO_MESSAGES } from '@/constants/messages';
import { use_user } from '@/hooks/use_user';
import { format_message } from '@/utils/format_message';
import MainForm from './main_form';
import './main.css';

function MainPage() {
	const user = use_user();
	const [message, set_message] = useState('');
	const [is_open, set_is_open] = useState('');

	if (!user) return null;

	return (
		<PageContainer title="SSCCtal" title_color="#2e5bff">
			<div className="main-label">{user.name}님 환영합니다</div>
			<MainForm />
			<Button
				onClick={() => {
					set_message(format_message(INFO_MESSAGES.alert_admin));
					set_is_open(true);
				}}
				class_name="admin-button"
			>
				문의하기
			</Button>
			{is_open && <AlertModal message={message} on_close={() => set_is_open(false)} />}
		</PageContainer>
	);
}

// //비로그인 시 코드
// function MainPage() {
// 	const location = useLocation();
// 	const user = location.state?.user;

// 	return (
// 		<div className="main-page">
// 			<div className="main-container">
// 				<div className="title">SCLibrary</div>
// 				<div className="label">
// 					{user ? `${user.name}님 환영합니다` : '비로그인 상태 (개발 중)'}
// 				</div>
// 				<MainForm />
// 			</div>
// 		</div>
// 	);
// }

export default MainPage;
