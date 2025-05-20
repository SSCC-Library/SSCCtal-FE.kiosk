// enter_page.jsx
import React, { useRef, useEffect } from 'react';
import mainimage from '@/assets/main.png';
import './signature.css';
import { useNavigate } from 'react-router-dom';

function EnterPage() {
	const sigCanvas = useRef();
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.removeItem('user');
	}, []);

	return (
		<div className="select-type">
			<h1 style={{ fontFamily: 'GongGothicMedium' }}>미래콘서트 전자서명</h1>
			<h2 style={{ fontFamily: 'NanumBarunGothic-Light' }}> UNICOSA X 숭실대학교 IT대학</h2>
			<img src={mainimage} alt="배경 이미지" className="background-image" />
			<div className="button-group">
				<button className="select-button left" onClick={() => navigate('/pre')}>
					사전 등록
				</button>
				<button className="select-button right">신규 등록</button>
			</div>
			<footer>ⓒ 2025. SSCC 원영진 김지성 송채원 정영인 All rights reserved.</footer>
		</div>
	);
}

export default EnterPage;
