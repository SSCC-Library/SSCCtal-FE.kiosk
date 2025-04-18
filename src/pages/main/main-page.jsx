import MainForm from './main-form';
import './main.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MainPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user) {
			alert('잘못된 접근입니다. 로그인 후 이용하세요.');
			navigate('/');
		}
	}, [user, navigate]);

	if (!user) return null;

	return (
		<div className="main-page">
			<div className="main-container">
				<div className="title">SCLibrary</div>
				<div className="label">{user.name}님 환영합니다</div>
				<MainForm />
			</div>
		</div>
	);
}
/*function MainPage() {
	const location = useLocation();
	const user = location.state?.user;

	return (
		<div className="main-page">
			<div className="main-container">
				<div className="title">SCLibrary</div>
				<div className="label">
					{user ? `${user.name}님 환영합니다` : '비로그인 상태 (개발 중)'}
				</div>
				<MainForm />
			</div>
		</div>
	);
}*/

export default MainPage;
