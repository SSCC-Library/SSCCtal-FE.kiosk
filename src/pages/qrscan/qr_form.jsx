import React, { useState, useRef } from 'react';
import Button from '@/components/button';
import './qrscan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoStream from '@/components/video_stream';
import InputField from '@/components/input_field';
import AlertModal from '@/components/alert_modal';

function QRForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mode } = location.state || {};

	// 상태
	const [is_camera_on, set_is_camera_on] = useState(false); // 영상 표시
	const [is_connecting, set_is_connecting] = useState(false); // ws 연결 시도 중
	const [is_connected, set_is_connected] = useState(false); // ws 연결 완료
	const [is_id_input, set_is_id_input] = useState(false);
	const [manual_id, set_manual_id] = useState('');
	const [is_open, set_is_open] = useState(false);
	const [message, set_message] = useState('');

	const wsRef = useRef(null);

	// "촬영 시작" 버튼 누르면
	const handle_qr_scan = () => {
		set_is_connecting(true);
		set_is_camera_on(false); // 혹시 모를 이전 영상 OFF

		// ws 이미 연결되어 있으면 닫고 새로 연결
		if (wsRef.current && wsRef.current.readyState === 1) {
			wsRef.current.close();
		}

		wsRef.current = new window.WebSocket('ws://prototype.sscctal.com/api/v0/ws/video');
		wsRef.current.onopen = () => {
			set_is_connecting(false);
			set_is_connected(true);
			set_is_camera_on(true);
			// 연결 완료되면 start 명령 바로 전송
			wsRef.current.send(JSON.stringify({ cmd: 'start' }));
		};
		wsRef.current.onmessage = (event) => {
			const res = JSON.parse(event.data);
			if (res && res.title) {
				// 책 정보 온 거 처리
				handle_item_flow(res);
			}
		};
		wsRef.current.onerror = () => {
			set_message('서버 연결 오류. 다시 시도해라.');
			set_is_open(true);
			set_is_connecting(false);
			set_is_connected(false);
			set_is_camera_on(false);
		};
		wsRef.current.onclose = () => {
			set_is_connecting(false);
			set_is_connected(false);
			set_is_camera_on(false);
		};
	};

	// 책 정보 오면 처리
	const handle_item_flow = (res) => {
		set_is_camera_on(false);
		set_is_connecting(false);
		set_is_connected(false);

		if (wsRef.current) {
			wsRef.current.close();
		}

		if (mode === 'rental') {
			if (res.status === 'available') {
				localStorage.setItem('item', JSON.stringify(res));
				navigate('/info', { state: { mode } });
			} else {
				navigate('/result/failure', {
					state: { mode, state: 'is_rental' },
				});
			}
		} else {
			if (res.status === 'available') {
				navigate('/result/failure', { state: { mode, state: 'is_return' } });
			} else {
				localStorage.setItem('item', JSON.stringify(res));
				navigate('/info', { state: { mode } });
			}
		}
	};

	return (
		<div className="qrscan-content">
			<div className="video-container">
				{is_camera_on ? (
					<VideoStream />
				) : is_connecting ? (
					<div className="video-placeholder">카메라 연결 중...</div>
				) : (
					<div className="video-placeholder">카메라 대기 중...</div>
				)}
			</div>
			<div className="qrscan-button-container">
				<Button
					onClick={handle_qr_scan}
					class_name="default-button"
					disabled={is_connecting || is_camera_on}
				>
					{is_connecting ? '연결 중...' : '촬영 시작'}
				</Button>
				<Button onClick={() => navigate('/main')} class_name="default-button">
					홈으로
				</Button>
			</div>
			{is_open && (
				<AlertModal
					message={message}
					on_close={() => {
						set_is_id_input(true);
						set_is_open(false);
					}}
				/>
			)}
			{is_id_input && (
				<>
					<div className="manual-input-overlay"></div>
					<div className="manual-input-section">
						<button className="close-button" onClick={() => set_is_id_input(false)}>
							✖
						</button>
						<InputField
							type="text"
							placeholder="ISBN을 입력하세요"
							value={manual_id}
							onChange={(e) => set_manual_id(e.target.value)}
						/>
						<div className="button-group">
							<Button onClick={() => {}} class_name="mini-button">
								확인
							</Button>
							<Button onClick={() => navigate('/main')} class_name="mini-button">
								홈으로
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default QRForm;
