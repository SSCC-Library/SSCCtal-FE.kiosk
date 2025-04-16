import { useState } from 'react';

export function use_login_limiter(limit = 3, duration = 60000) {
	const [attempts, set_attempts] = useState(0);
	const [first_time, set_first_time] = useState(null);
	const [is_locked, set_is_locked] = useState(false);
	const [remaining_time, set_remaining_time] = useState(0);

	const check = () => {
		const now = Date.now();
		if (!first_time) return false;

		const elapsed = now - first_time;

		if (elapsed < duration && attempts >= limit) {
			return true;
		}

		if (elapsed >= duration) {
			set_first_time(now);
			set_attempts(0);
		}

		return false;
	};

	const add_attempt = () => {
		if (!first_time) {
			set_first_time(Date.now());
		}
		set_attempts((prev) => prev + 1);
	};

	const lock_temporarily = () => {
		set_is_locked(true);

		const start = Date.now();
		const interval = setInterval(() => {
			const passed = Date.now() - start;
			const left = Math.ceil((duration - passed) / 1000);
			set_remaining_time(left > 0 ? left : 0);
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
			set_is_locked(false);
			set_attempts(0);
			set_first_time(null);
			set_remaining_time(null);
		}, duration);
	};

	return { is_locked, check, add_attempt, lock_temporarily, remaining_time, attempts };
}
