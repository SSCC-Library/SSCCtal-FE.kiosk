/*
비정상적인 접근(로그인 없이 대여/반납 시도) 시
알림 메세지 띄운 후 로그인 화면으로 이동시키는 훅
*/

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function use_user() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user) {
			navigate('/', { state: { message: '잘못된 접근입니다. 로그인 후 이용하세요' } });
		}
	}, [user, navigate]);

	return user;
}
