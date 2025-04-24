import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const qrScanStart = async () => {
	const res = await axios.post(`${BACKEND_URL}/api/v0/stream/start`);
	return res.data;
};
