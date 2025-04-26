import React from 'react';
import Button from '@/components/button';
import './info.css';
import { useNavigate } from 'react-router-dom';
import { result } from '@/api/result_api';
import { use_user } from '@/hooks/use_user';

function InfoForm({ item, mode, current_date, return_date }) {
	const navigate = useNavigate();
	const user = use_user();
	const handle_item = async () => {
		//navigate('/result/success', { state: { mode } });
		try {
			const res = await result(
				user.student_id,
				item.item_id,
				current_date,
				return_date,
				mode
			);

			if (res.success) navigate('/result/success', { state: { mode } });
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
		<div>
			<Button onClick={handle_item} class_name="login-button">
				{mode === 'rental' ? '대여하기' : '반납하기'}
			</Button>
			<Button onClick={handle_retry} class_name="picture-button">
				QR코드 재인식
			</Button>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}
export default InfoForm;
