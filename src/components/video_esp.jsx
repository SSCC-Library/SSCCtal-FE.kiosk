/*
ESP32 제어+결과 채널 (start/stop/reset + 결과 수신)
- 서버 메시지 스펙:
  { status: 'started'|'stopped'|'error'|'recognized'|'not_found'|'timeout', ... }
  { type: 'status', from, value }
- props:
  - url: 제어 WebSocket 주소 (wss://.../ws/web)
  - on_log(line: string): 로그 문자열 콜백
  - on_status(status: string): 'started' 등 상태 콜백
  - on_result(payload): recognized/not_found/timeout 등 원본 payload 콜백
  - ui: 기본 버튼 UI 숨길지 여부 (true면 버튼 숨김, 외부에서 직접 제어)
*/
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '@/components/button';

const CMD = {
	START: 'start',
	STOP: 'stop',
	RESET: 'reset',
};

function ScanControl({ url, on_log, on_status, on_result, ui = true, class_name = '' }) {
	const ws_ref = useRef(null);
	const [ready_state, set_ready_state] = useState('CLOSED'); // OPENING | OPEN | CLOSED
	const [badge_text, set_badge_text] = useState('');

	const log = useCallback(
		(s) => {
			on_log && on_log(s);
		},
		[on_log]
	);

	const set_status = useCallback(
		(s) => {
			on_status && on_status(s);
		},
		[on_status]
	);

	const clear_badge = useCallback(() => set_badge_text(''), []);
	const show_badge = useCallback((s) => set_badge_text(s), []);

	// 소켓 연결
	useEffect(() => {
		if (!url) return;
		set_ready_state('OPENING');

		const ws = new WebSocket(url);
		ws_ref.current = ws;

		ws.onopen = () => {
			set_ready_state('OPEN');
			log('web socket connected ✅');
		};

		ws.onmessage = (evt) => {
			let m = null;
			try {
				m = JSON.parse(evt.data);
			} catch {
				log(evt.data);
				return;
			}

			if (m.status === 'started') {
				set_status('started');
				log('started ✅');
			} else if (m.status === 'stopped') {
				set_status('stopped');
				log('stopped ⏹');
			} else if (m.status === 'error') {
				set_status('error');
				log(`ERROR ${m.code ?? ''} ${m.message ?? ''}`.trim());
			} else if (m.status === 'recognized') {
				const v = m.item_id || m.title || '';
				show_badge(`바코드: ${v}`);
				set_status('recognized');
				on_result && on_result(m);
				log(`recognized ✅ (${m.item_id || ''})`);
			} else if (m.status === 'not_found') {
				clear_badge();
				set_status('not_found');
				on_result && on_result(m);
				log('not_found (404)');
			} else if (m.status === 'timeout') {
				clear_badge();
				set_status('timeout');
				on_result && on_result(m);
				log('timeout (408)');
			} else if (m.type === 'status') {
				log(`[${m.from}] ${m.value}`);
			} else {
				log(evt.data);
			}
		};

		ws.onerror = (e) => {
			log('web socket error');
		};

		ws.onclose = () => {
			set_ready_state('CLOSED');
			log('web socket closed');
		};

		return () => {
			try {
				ws.close();
			} catch {}
			set_ready_state('CLOSED');
		};
	}, [url, log, set_status, on_result, show_badge, clear_badge]);

	const is_open = ready_state === 'OPEN';

	const send_cmd = useCallback((type) => {
		const ws = ws_ref.current;
		if (!ws || ws.readyState !== WebSocket.OPEN) return;
		ws.send(JSON.stringify({ type }));
	}, []);

	const on_click_start = useCallback(() => {
		clear_badge();
		send_cmd(CMD.START);
	}, [send_cmd, clear_badge]);

	const on_click_stop = useCallback(() => {
		send_cmd(CMD.STOP);
	}, [send_cmd]);

	const on_click_reset = useCallback(() => {
		clear_badge();
		send_cmd(CMD.RESET);
	}, [send_cmd, clear_badge]);

	// 외부 제어가 필요하면 Imperative Handle 패턴을 써도 됨(지금은 필요 X)

	return (
		<div className={class_name} style={{ textAlign: 'center' }}>
			{!ui ? null : (
				<div
					style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 10 }}
				>
					<Button
						onClick={on_click_start}
						disabled={!is_open}
						style={{
							padding: '10px 16px',
							border: 0,
							borderRadius: 10,
							background: '#2563eb',
							color: '#fff',
							cursor: is_open ? 'pointer' : 'not-allowed',
						}}
					>
						QR 코드 찍기
					</Button>
					{/* <button
						onClick={on_click_stop}
						disabled={!is_open}
						style={{
							padding: '10px 16px',
							border: 0,
							borderRadius: 10,
							background: '#6b7280',
							color: '#fff',
							cursor: is_open ? 'pointer' : 'not-allowed',
						}}
					>
						STOP
					</button>
					<button
						onClick={on_click_reset}
						disabled={!is_open}
						style={{
							padding: '10px 16px',
							border: 0,
							borderRadius: 10,
							background: '#6b7280',
							color: '#fff',
							cursor: is_open ? 'pointer' : 'not-allowed',
						}}
					>
						RESET
					</button> */}
				</div>
			)}

			{badge_text ? (
				<div
					style={{
						margin: '8px auto',
						padding: '8px 12px',
						borderRadius: 10,
						background: '#16a34a',
						color: '#fff',
						fontWeight: 700,
						width: 'fit-content',
					}}
				>
					{badge_text}
				</div>
			) : null}
		</div>
	);
}

export default ScanControl;
