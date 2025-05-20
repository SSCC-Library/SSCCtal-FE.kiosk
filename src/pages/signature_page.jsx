import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import './signature.css';
import { upload_signature } from '@/api/upload_api';
import AlertModal from './alertmodal';

function SignaturePage() {
	const sigCanvas = useRef();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));
	const [modal_message, set_modal_message] = useState('');
	const [is_modal_open, set_is_modal_open] = useState(false);

	const open_modal = (msg) => {
		set_modal_message(msg);
		set_is_modal_open(true);
	};

	const close_modal = () => {
		set_is_modal_open(false);
	};

	// 서명 초기화
	const clear_signature = () => {
		sigCanvas.current.clear();
	};

	// 이미지 서버로 전송
	const post_signature = async () => {
		if (sigCanvas.current.isEmpty()) {
			alert('서명을 입력해주세요.');
			return;
		}

		try {
			// 1. base64 → Blob → File
			const base64_data_url = sigCanvas.current.getCanvas().toDataURL('image/png');
			const blob = await (await fetch(base64_data_url)).blob();
			const file = new File([blob], `${user.name}_${user.id}_${user.student_id}.png`, {
				type: 'image/png',
			});

			// 2. API 호출
			const response = await upload_signature(file, user.name, user.student_id);
			console.log('[업로드 성공]', response);
			open_modal('서명이 성공적으로 업로드되었습니다');
		} catch (error) {
			console.error('[업로드 실패]', error);
			open_modal('서명 업로드에 실패했습니다');
		}
	};

	return (
		<>
			<div className="signature-container">
				<h2>서명을 입력해주세요</h2>
				<SignatureCanvas
					ref={sigCanvas}
					canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
				/>
				<div className="signature-button-group">
					<button onClick={clear_signature}>지우기</button>
					<button onClick={post_signature}>서버로 보내기</button>
					<button onClick={() => navigate('/')}>돌아가기</button>
				</div>
			</div>

			{/* 모달은 container 밖에서 화면 전체 기준 */}
			{is_modal_open && (
				<AlertModal
					message={modal_message}
					onClose={() => {
						close_modal();
						navigate('/');
					}}
				/>
			)}
		</>
	);
}

export default SignaturePage;
