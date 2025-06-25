/*
웹소켓 서버 연결 후 BE와 통신하는 훅
*/

import { useRef, useEffect, useCallback } from 'react';

export default function use_ws_qrscan({ on_message, on_error, on_open, on_close }) {
	const ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket('ws://prototype.sscctal.com/api/v0/ws/video');

		ws.current.onopen = () => {
			on_open && on_open();
		};
		ws.current.onmessage = (event) => {
			on_message && on_message(JSON.parse(event.data));
		};
		ws.current.onerror = (err) => {
			on_error && on_error(err);
		};
		ws.current.onclose = () => {
			on_close && on_close();
		};

		return () => {
			ws.current && ws.current.close();
		};
	}, []);

	const send_command = useCallback((data) => {
		if (ws.current && ws.current.readyState === 1) {
			ws.current.send(JSON.stringify(data));
		}
	}, []);

	return { send_command };
}
