import Button from '@/components/button';
import './failure.css';
import { useNavigate, useLocation } from 'react-router-dom';
import failureImg from '@/assets/failure.png';
import Message from '@/components/message';
import { useState, useEffect } from 'react';
import { ERROR_MESSAGES } from '@/constants/messages';

function FailurePage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [error, set_error] = useState('');
	const { mode, state } = location.state || {};
	// const mode = '대여';
	// const state = 'is_rental';

	useEffect(() => {
		set_error(ERROR_MESSAGES[state]);
	}, []);

	return (
		<div className="failure-container">
			<div className="failure-content">
				<div className="failure-title">{mode === 'rental' ? '대여' : '반납'} 실패</div>
				<img src={failureImg} alt="실패 이미지" className="failure-image" />
				<Message type="message" text={error} class_name="result" />
				<Button onClick={() => navigate('/main')} class_name="default-button">
					확인
				</Button>
			</div>
		</div>
	);
}

export default FailurePage;
