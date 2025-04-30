import './alert_modal.css';
import Button from './button';

function AlertModal({ message, on_close }) {
	return (
		<div className="alert-backdrop">
			<div className="alert-modal">
				{/* <p>{code}</p> */}
				<div className="modal-message">{message}</div>
				<Button onClick={on_close} class_name="mini-button">
					확인
				</Button>
			</div>
		</div>
	);
}

export default AlertModal;
