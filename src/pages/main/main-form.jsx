import React from 'react';
import Button from '@/components/button';
import './main.css';
import { useNavigate } from 'react-router-dom';

function MainForm() {
	const navigate = useNavigate();

	return (
		<div className="main-page">
			<Button onClick={() => navigate('/')} class_name="rental-button">
				대여
			</Button>
			<Button onClick={() => navigate('/')} class_name="return-button">
				반납
			</Button>
			<Button onClick={() => navigate('/')} class_name="login-button">
				로그아웃
			</Button>
		</div>
	);
}

export default MainForm;
