import './message.css';

function Message({ text, type = 'info', class_name = '' }) {
	if (!text) return null;

	return <div className={`message ${type} ${class_name}`}>{text}</div>;
}

export default Message;
