import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function use_user() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user) {
			alert('잘못된 접근입니다. 로그인 후 이용하세요');
			navigate('/');
		}
	}, [user, navigate]);

	return user;
}
