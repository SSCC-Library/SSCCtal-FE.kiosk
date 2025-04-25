import React from 'react';
import Button from '@/components/button';
import './info.css';
import { useNavigate } from 'react-router-dom';
function InfoForm({ item, mode }) {
	const navigate = useNavigate();
	const handle_item = async () => {
		console.log(mode);
		console.log(item);
		navigate('/result/success', { state: { mode, type: item.type } });
	};
	return (
		<div>
			<Button onClick={handle_item} class_name="login-button">
				{mode === 'rental' ? '대여하기' : '반납하기'}
			</Button>
			<Button onClick={() => navigate(-1)} class_name="picture-button">
				QR코드 재인식
			</Button>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}
export default InfoForm;
