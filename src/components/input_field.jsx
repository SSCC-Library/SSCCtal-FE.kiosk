import './input_field.css';

function InputField({ type = 'text', value, onChange, placeholder }) {
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
