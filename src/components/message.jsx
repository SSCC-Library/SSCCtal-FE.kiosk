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
