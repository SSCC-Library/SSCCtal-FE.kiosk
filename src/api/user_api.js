import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const verifyUserBySchoolNumber = async (school_number) => {
	const res = await axios.post(`${BACKEND_URL}/user/by-school-number`, {
		school_number,
	});
	return res.data;
};
