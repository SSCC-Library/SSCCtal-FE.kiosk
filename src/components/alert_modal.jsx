/*
알림 메세지를 표시하는 모달 컴포넌트
message: 표시할 알림 텍스트
on_close: 확인 버튼 클릭 시 호출되는 함수
*/

import './alert_modal.css';
import Button from './button';

function AlertModal({ message, on_close }) {
	return (
		<div className="alert-backdrop">
			<div className="alert-modal">
				<div className="modal-message">{message}</div>
				<Button onClick={on_close} class_name="mini-button">
					확인
				</Button>
			</div>
		</div>
	);
}

export default AlertModal;
