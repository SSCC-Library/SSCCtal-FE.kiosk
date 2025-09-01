/*
현재 날짜와 2주 후 날짜 반환하는 훅
*/

import { useState, useEffect } from 'react';

/*
current_string: yyyy-mm-dd/hh:mm:ss
next_string(2주 후): yyyy-mm-dd
*/

export function use_get_date() {
	const [current_string, set_current_string] = useState('');
	const [next_string, set_next_string] = useState('');

	useEffect(() => {
		const today = new Date();

		const current =
			today.getFullYear() +
			'-' +
			('0' + (today.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + today.getDate()).slice(-2) +
			'T' +
			('0' + today.getHours()).slice(-2) +
			':' +
			('0' + today.getMinutes()).slice(-2) +
			':' +
			('0' + today.getSeconds()).slice(-2) +
			'Z';
		set_current_string(current);

		const next_date = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
		const next_str =
			next_date.getFullYear() +
			'-' +
			('0' + (next_date.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + next_date.getDate()).slice(-2);
		set_next_string(next_str);
	}, []);

	return { current_string, next_string };
}
