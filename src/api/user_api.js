/*
학번, 비밀번호 입력 후 서버로 전송하는 로그인 API
*/
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (school_number, password) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/api/v0/login`, {
			student_id: school_number,
			password: password,
		});
		return res.data;
	} catch (err) {
		throw { success: false, code: 500, data: null, message: '서버와 통신 중 오류 발생' };
	}
};
