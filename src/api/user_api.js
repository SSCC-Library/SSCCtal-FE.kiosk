import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const verifyUserBySchoolNumber = async (schoolnumber) => {
	const res = await axios.post(`${BACKEND_URL}/user/by-schoolnumber`, {
		schoolnumber,
	});
	return res.data;
};
