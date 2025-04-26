import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const manual_input_id = async (item_id) => {
	const res = await axios.post(`${BACKEND_URL}/api/v0/manual/input`, {
		item_id: item_id,
	});
	return res.data;
};
