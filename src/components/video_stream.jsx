/*
ESP32 JPEG 스트림 수신 전용 캔버스 뷰어
- binary ArrayBuffer → Blob(image/jpeg) → Image → canvas draw
- props:
  - url: 스트림 WebSocket 주소 (wss://.../ws/stream)
  - width, height: 캔버스 크기
  - class_name: 캔버스 스타일용 클래스
  - on_open / on_close / on_error: 소켓 라이프사이클 콜백
*/
import React, { useEffect, useRef } from 'react';

function StreamViewer({
	url,
	width = 320,
	height = 240,
	class_name = '',
	on_open,
	on_close,
	on_error,
}) {
	const canvas_ref = useRef(null);
	const ws_ref = useRef(null);
	const last_url_ref = useRef(null);

	useEffect(() => {
		if (!url) return;

		const cvs = canvas_ref.current;
		const ctx = cvs.getContext('2d');

		const ws = new WebSocket(url);
		ws_ref.current = ws;
		ws.binaryType = 'arraybuffer';

		ws.onopen = () => {
			on_open && on_open();
		};

		ws.onmessage = (evt) => {
			// 가끔 서버에서 텍스트 헛소리가 올 수도 있으니 방어
			if (!(evt.data instanceof ArrayBuffer)) return;
			const blob = new Blob([evt.data], { type: 'image/jpeg' });
			const img = new Image();
			img.onload = () => {
				try {
					ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
				} finally {
					URL.revokeObjectURL(img.src);
					last_url_ref.current = null;
				}
			};
			const obj_url = URL.createObjectURL(blob);
			last_url_ref.current = obj_url;
			img.src = obj_url;
		};

		ws.onerror = (e) => {
			on_error && on_error(e);
		};

		ws.onclose = () => {
			on_close && on_close();
		};

		return () => {
			// 정리 깔끔하게
			try {
				ws.close();
			} catch {}
			if (last_url_ref.current) {
				URL.revokeObjectURL(last_url_ref.current);
				last_url_ref.current = null;
			}
		};
	}, [url]);

	return (
		<canvas
			ref={canvas_ref}
			width={width}
			height={height}
			className={class_name}
			style={{
				border: '2px solid #111',
				borderRadius: 10,
				background: '#333',
				display: 'block',
				margin: '0 auto',
			}}
		/>
	);
}

export default StreamViewer;
