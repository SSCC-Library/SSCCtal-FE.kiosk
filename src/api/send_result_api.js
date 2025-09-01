/*
대여/반납 도서 정보를 서버로 전송하는 API
- 대여 시 학번, ISBN, 대여 날짜, 예상 반납 날짜 전송
- 반납 시 학번, ISBN, 반납 날짜 전송
*/

import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ADMIN_TOKEN = localStorage.getItem('token');

const AUTH_HEADER = {
	headers: {
		Authorization: `Bearer ${ADMIN_TOKEN}`,
	},
};

export const send_result = async (identifier_code, mode) => {
	const url = mode === 'rental' ? '/api/v1/kiosk/rent' : '/api/v1/kiosk/return';

	const res = await axios.post(`${BACKEND_URL}${url}/${identifier_code}`, AUTH_HEADER);
	return res.data;
};
