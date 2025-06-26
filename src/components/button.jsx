/*
버튼을 표시하는 컴포넌트
class_name에 따라 버튼 모양 조절
*/

import './button.css';

function Button({ type = 'button', children, class_name, disabled, onClick }) {
	return (
		<button
			type={type}
			className={`default-button ${class_name} ${disabled ? 'disabled' : ''}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
