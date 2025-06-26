/*
입력 횟수 표시 및 횟수 초과 시 
입력 잠금 시간을 표시해주는 컴포넌트
*/

import './message.css';

function Message({ type = 'info', text, class_name = '' }) {
	if (!text) return null;

	return (
		<div className={`message ${type} ${class_name}`}>
			{typeof text === 'string' ? <p>{text}</p> : text}
		</div>
	);
}

export default Message;
