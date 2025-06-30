/*
info 폼
- 서버로 대여/반납 정보 전송, 성공/실패에 따라 라우팅
- qr코드 재인식, 홈 이동 처리
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { send_result } from '@/api/send_result_api';
import Button from '@/components/button';
import { use_user } from '@/hooks/use_user';
import './info.css';

function InfoForm({ item, mode, current_date, return_date }) {
	const navigate = useNavigate();
	const user = use_user();

	const handle_item = async () => {
		try {
			const res = await send_result(
				user.student_id,
				item.item_id,
				current_date,
				return_date,
				mode
			);

			if (res.success) navigate('/result/success', { state: { mode } });
			else if (!res.success && mode === 'return')
				navigate('/result/failure', { state: { mode, state: 'dif_return' } });
		} catch (err) {
			alert('서버와 통신 중 오류가 발생하였습니다. 관리자에게 문의해주세요');
			localStorage.removeItem('item');
			navigate('/main');
		}
	};

	const handle_retry = () => {
		localStorage.removeItem('item');
		navigate(-1);
	};
	return (
		<div className="info-button-container">
			<Button onClick={handle_item} class_name="default-button">
				{mode === 'rental' ? '대여하기' : '반납하기'}
			</Button>
			<Button onClick={handle_retry} class_name="default-button">
				QR코드 재인식
			</Button>
			<Button
				onClick={() => {
					localStorage.removeItem('item');
					navigate('/main');
				}}
				class_name="default-button"
			>
				홈으로
			</Button>
		</div>
	);
}
export default InfoForm;
