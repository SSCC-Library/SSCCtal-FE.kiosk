import React, { useEffect, useRef } from 'react';
import './video_stream.css';

const ESP_URL = import.meta.env.VITE_ESP_URL;

function VideoStream() {
	const imgRef = useRef(null);
	const wsRef = useRef(null);

	useEffect(() => {
		const ws = new WebSocket(`${ESP_URL}`);
		ws.binaryType = 'blob';
		wsRef.current = ws;

		ws.onmessage = (event) => {
			if (imgRef.current) {
				const url = URL.createObjectURL(event.data);
				imgRef.current.src = url;
				imgRef.current.onload = () => URL.revokeObjectURL(url); // 메모리 정리
			}
		};

		const pingInterval = setInterval(() => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send('ping');
			}
		}, 5000);

		return () => {
			clearInterval(pingInterval);
			ws.close();
		};
	}, []);

	return <img ref={imgRef} alt="ESP32 Video" />;
}

export default VideoStream;
