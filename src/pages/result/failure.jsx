import Button from '@/components/button';
import './failure.css';
import { useNavigate, useLocation } from 'react-router-dom';
import failureImg from '@/assets/failure.png';
import Message from '@/components/message';
import { useState, useEffect } from 'react';
import { INFO_MESSAGES, ERROR_MESSAGES } from '@/constants/messages';
import AlertModal from '@/components/alert_modal';

function FailurePage() {
	const navigate = useNavigate();
	const location = useLocation();
	const [error, set_error] = useState('');
	const { mode, state } = location.state || {};
	const [is_open, set_is_open] = useState(false);
	const [message, set_message] = useState('');
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
				<Button
					onClick={() => {
						set_message(INFO_MESSAGES.alert_admin);
						set_is_open(true);
					}}
					class_name="admin-button"
				>
					문의하기
				</Button>
				{is_open && <AlertModal message={message} on_close={() => set_is_open(false)} />}
			</div>
		</div>
	);
}

export default FailurePage;
