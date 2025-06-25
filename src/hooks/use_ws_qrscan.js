import { useRef, useEffect, useCallback } from 'react';

export default function useWSQRScan({ onMessage, onError, onOpen, onClose }) {
	const ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket('ws://prototype.sscctal.com/api/v0/ws/video');

		ws.current.onopen = () => {
			onOpen && onOpen();
		};
		ws.current.onmessage = (event) => {
			onMessage && onMessage(JSON.parse(event.data));
		};
		ws.current.onerror = (err) => {
			onError && onError(err);
		};
		ws.current.onclose = () => {
			onClose && onClose();
		};

		return () => {
			ws.current && ws.current.close();
		};
	}, []);

	const sendCommand = useCallback((data) => {
		if (ws.current && ws.current.readyState === 1) {
			ws.current.send(JSON.stringify(data));
		}
	}, []);

	return { sendCommand };
}
