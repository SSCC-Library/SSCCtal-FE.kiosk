import './button.css';

function Button({ type = 'button', children, class_name = '', disabled = false, onClick }) {
	return (
		<button
			type={type}
			className={`primary-button ${class_name} ${disabled ? 'disabled' : ''}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
