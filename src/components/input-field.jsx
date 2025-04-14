import './input-field.css';

function InputField({ type = 'text', value, onChange, placeholder, class_name = '' }) {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`input-field ${class_name}`}
		/>
	);
}

export default InputField;
