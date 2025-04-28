import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const manual_input_id = async (manual_id) => {
	const res = await axios.post(`${BACKEND_URL}/api/v0/manual/input`, {
		isbn: manual_id,
	});
	return res.data;
};
