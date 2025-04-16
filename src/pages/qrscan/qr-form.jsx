import React from 'react';
import Button from '@/components/button';
import './qrscan.css';
import { useNavigate, useLocation } from 'react-router-dom';

function QRForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mode } = location.state || {};

	const handle_qr_success = () => {
		if (mode == 'rental') {
			navigate('/main');
		} else if (mode == 'return') {
			navigate('/');
		} else {
			console.error('잘못된 접근');
		}
	};

	return (
		<div>
			<Button onClick={handle_qr_success} class_name="picture-button">
				촬영
			</Button>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}

export default QRForm;
