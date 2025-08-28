import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './black.css';

function BlackPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const handle_input = () => {
			navigate('/'); // 로그인 페이지로
		};

		window.addEventListener('mousedown', handle_input);
		window.addEventListener('keydown', handle_input);
		window.addEventListener('touchstart', handle_input);

		return () => {
			window.removeEventListener('mousedown', handle_input);
			window.removeEventListener('keydown', handle_input);
			window.removeEventListener('touchstart', handle_input);
		};
	}, []);

	return <div className="black-screen"></div>;
}

export default BlackPage;
