import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Main from './main';

function App() {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let timeout_id;

		const reset_timer = () => {
			clearTimeout(timeout_id);
			timeout_id = setTimeout(() => {
				localStorage.clear(); // 로그인 정보 제거
				navigate('/black');
			}, 60_000); // 1분
		};

		const handle_input = () => {
			reset_timer();
		};

		window.addEventListener('mousedown', handle_input);
		window.addEventListener('keydown', handle_input);
		window.addEventListener('touchstart', handle_input);
		window.addEventListener('mousemove', handle_input);

		reset_timer();

		return () => {
			clearTimeout(timeout_id);
			window.removeEventListener('mousedown', handle_input);
			window.removeEventListener('keydown', handle_input);
			window.removeEventListener('touchstart', handle_input);
			window.removeEventListener('mousemove', handle_input);
		};
	}, [location.pathname]); // 페이지 바뀌면 타이머 초기화

	return <Main />;
}

export default App;
