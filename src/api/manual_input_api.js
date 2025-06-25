/*
	QR 인식 오류 시 직접 입력한 ISBN 보내는 API
*/

import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const manual_input_id = async (isbn) => {
	const res = await axios.post(`${BACKEND_URL}/api/v0/manual/input`, {
		isbn: isbn,
	});
	return res.data;
};
