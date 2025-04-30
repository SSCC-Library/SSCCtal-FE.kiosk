import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const result = async (student_id, item_id, current_date, return_date, mode) => {
	const url = mode === 'rental' ? '/api/v0/rental' : '/api/v0/return';
	const data = {
		student_id,
		item_id,
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
