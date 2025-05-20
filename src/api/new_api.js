import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const new_sig = async (name, school_number) => {
	try {
		const res = await axios.post(`${BACKEND_URL}/api/v0/pre/application/inquiry/check`, {
			name: name,
			student_id: school_number,
		});
		return res.data;
	} catch (err) {
		throw { success: false, code: 500, data: null, message: '서버와 통신 중 오류 발생' };
	}
};
