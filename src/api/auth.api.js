import axios from 'axios';

export const loginRequest = async (userId, pwd) => {
	const params = new URLSearchParams();
	params.append('in_tp_bit', '0');
	params.append('rqst_caus_cd', '03');
	params.append('userId', userId);
	params.append('pwd', pwd);

	const res = await axios.post('/api/ssu/smln_pcs.asp', params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
	return res.data;
};
