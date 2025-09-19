/*
QR 인식 오류 시 직접 입력한 ISBN 보내는 API
*/

import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const ADMIN_TOKEN = localStorage.getItem('token');

const AUTH_HEADER = () => ({
	headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const manual_input_id = async (isbn) => {
	const res = await axios.get(`${BACKEND_URL}/api/v1/kiosk/input/${isbn}`, AUTH_HEADER);
	return res.data;
};
