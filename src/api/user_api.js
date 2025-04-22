import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const login = async (school_number, password) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/login`, {
			school_number,
			password,
		});
		return res.data;
	} catch (err) {
		if (err.response && err.response.data) {
			return err.response.data;
		} else {
			return { status: 'fail', message: '서버와 통신 중 오류 발생' };
		}
	}
};
