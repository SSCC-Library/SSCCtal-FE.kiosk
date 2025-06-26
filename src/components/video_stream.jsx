/*
WebSocket을 통해 QR 인식 화면을 보여주는 컴포넌트
ESP32에서 영상 스트림을 받아 img 태그로 실시간 표시
*/

import React, { useEffect, useRef } from 'react';
import './video_stream.css';

const ESP_URL = import.meta.env.VITE_ESP_URL;

function VideoStream() {
	const imgRef = useRef(null);
	const wsRef = useRef(null);

	useEffect(() => {
		const ws = new WebSocket(`${ESP_URL}`); //ESP32와 WebSocket 연결
		ws.binaryType = 'blob';
		wsRef.current = ws;

		ws.onmessage = (event) => {
			if (imgRef.current) {
				const url = URL.createObjectURL(event.data); //수신한 blob 데이터를 URL로 변환 후 img에 표시
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
