/*
	대여/반납 도서 정보를 서버로 전송하는 API
	- 대여 시 학번, ISBN, 대여 날짜, 예상 반납 날짜 전송
	- 반납 시 학번, ISBN, 반납 날짜 전송
*/

import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const send_result = async (student_id, item_id, current_date, return_date, mode) => {
	const url = mode === 'rental' ? '/api/v0/rental' : '/api/v0/return';
	const data = {
		studend_id: student_id,
		item_id: item_id,
	};

	if (mode === 'rental') {
		data.rental_date = current_date;
		data.expectation_return_date = return_date;
	} else {
		data.return_date = current_date;
	}

	const res = await axios.post(`${BACKEND_URL}${url}`, data);
	return res.data;
};
