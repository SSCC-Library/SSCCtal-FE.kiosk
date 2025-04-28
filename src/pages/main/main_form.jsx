import React from 'react';
import Button from '@/components/button';
import './main.css';
import { useNavigate } from 'react-router-dom';

function MainForm() {
	const navigate = useNavigate();

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
			<Button onClick={() => navigate('/')} class_name="default-button">
				로그아웃
			</Button>
		</div>
	);
}

export default MainForm;
