import { useState, useEffect } from 'react';

export function use_get_date() {
	const [rental_string, set_rental_string] = useState('');
	const [return_string, set_return_string] = useState('');

	useEffect(() => {
		const today = new Date();

		// rental_string: yyyy-mm-dd/hh:mm:ss
		const rental =
			today.getFullYear() +
			'-' +
			('0' + (today.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + today.getDate()).slice(-2) +
			'/' +
			('0' + today.getHours()).slice(-2) +
			':' +
			('0' + today.getMinutes()).slice(-2) +
			':' +
			('0' + today.getSeconds()).slice(-2);
		set_rental_string(rental);

		// return_string: 2주 후 yyyy-mm-dd
		const return_date = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
		const return_str =
			return_date.getFullYear() +
			'-' +
			('0' + (return_date.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + return_date.getDate()).slice(-2);
		set_return_string(return_str);
	}, []);

	return { rental_string, return_string };
}
