import './alert_modal.css';
import Button from './button';
import { INFO_MESSAGES } from '@/constants/messages';

function AlertModal({ message, on_close }) {
	return (
		<div className="alert-backdrop">
			<div className="alert-modal">
				{/* <p>{code}</p> */}
				<p>{message}</p>
				<p>{INFO_MESSAGES.admin_number}</p>
				<Button onClick={on_close} class_name="mini-button">
					확인
				</Button>
			</div>
		</div>
	);
}

export default AlertModal;
