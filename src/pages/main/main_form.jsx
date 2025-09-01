/*
메인 폼
- 대여/반납 모드 선택, 로그아웃 버튼
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/auth_api';
import Button from '@/components/button';
import './main.css';

function MainForm() {
	const navigate = useNavigate();

	const handle_logout = async () => {
		try {
			const res = await logout();
			console.log(res);
		} catch (err) {
			console.error('로그아웃 API 호출 실패:', err);
		}
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('item');
		localStorage.removeItem('item_copy');
		navigate('/');
	};

	return (
		<div className="main-button-wrapper">
			<div className="main-button-container">
				<Button
					onClick={() => navigate('/qrscan', { state: { mode: 'rental' } })}
					class_name="square-button"
				>
					대여
				</Button>
				<Button
					onClick={() => navigate('/qrscan', { state: { mode: 'return' } })}
					class_name="square-button"
				>
					반납
				</Button>
			</div>
			<Button onClick={handle_logout} class_name="default-button">
				로그아웃
			</Button>
		</div>
	);
}

export default MainForm;
