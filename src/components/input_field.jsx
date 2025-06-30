/*
학번, 비밀번호, ISBN을 입력하는 컴포넌트
*/

import './input_field.css';

function InputField({ type, value, onChange, placeholder }) {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`input-field`}
		/>
	);
}

export default InputField;
