// pre_page.jsx
import React, { useState } from 'react';
import mainimage from '@/assets/main.png';
import './signature.css';
import { useNavigate } from 'react-router-dom';
import { pre } from '@/api/pre_api';
import AlertModal from './alertmodal';

function PrePage() {
	const navigate = useNavigate();
	const [modal_message, set_modal_message] = useState('');
	const [is_modal_open, set_is_modal_open] = useState(false);

	const open_modal = (msg) => {
		set_modal_message(msg);
		set_is_modal_open(true);
	};

	const close_modal = () => {
		set_is_modal_open(false);
	};

	const handle_pre_register = async () => {
		try {
			const res = await pre('원영진', 20221797); // 실사용 시 form 데이터로 대체
			console.log('응답:', res);
			if (res.status == false) {
				open_modal('신규 등록이 필요합니다');
			} else {
				localStorage.setItem('user', JSON.stringify(res));
				navigate('/signature');
			}
		} catch (err) {
			console.error('에러 발생:', err);
			alert('사전 등록 정보를 불러오는 데 실패했습니다.');
		}
	};

	return (
		<div className="select-type">
			<h1 style={{ fontFamily: 'GongGothicMedium' }}>사전등록 테스트</h1>
			<h2 style={{ fontFamily: 'NanumBarunGothic-Light' }}> 빨리 만들어주쇼</h2>
			<img src={mainimage} alt="배경 이미지" className="background-image" />
			<div className="button-group">
				<button className="select-button left" onClick={handle_pre_register}>
					이름 post
				</button>
				<button className="select-button right" onClick={() => navigate('/')}>
					돌아가기
				</button>
			</div>
			<footer>ⓒ 2025. SSCC 원영진 김지성 송채원 정영인 All rights reserved.</footer>

			{is_modal_open && (
				<AlertModal
					message={modal_message}
					onClose={() => {
						close_modal();
						navigate('/');
					}}
				/>
			)}
		</div>
	);
}

export default PrePage;
