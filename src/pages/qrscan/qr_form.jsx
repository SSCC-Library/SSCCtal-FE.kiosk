/*
qr 폼
- QR 코드 인식(카메라), ISBN 수동 입력 모두 지원
- WebSoket으로 실시간 QR 인식
*/

import React, { useState, useRef, useCallback } from 'react';
import Button from '@/components/button';
import './qrscan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { manual_input_id } from '../../api/manual_input_api';
import StreamViewer from '@/components/video_stream';
import ScanControl from '@/components/video_esp';
import InputField from '@/components/input_field';
import AlertModal from '@/components/alert_modal';
import { format_message } from '@/utils/format_message';

const ESP_URL = import.meta.env.VITE_ESP_URL;
const CONTROL_URL = `${ESP_URL}/ws/web`;
const STREAM_URL = `${ESP_URL}/ws/stream`;

function QRForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mode } = location.state || {};

	// status로 qr 화면 관리
	const [status, set_status] = useState('default'); //default | connecting | connected | error
	const [is_id_input, set_is_id_input] = useState(false);
	const [manual_id, set_manual_id] = useState('');
	const [message, set_message] = useState(
		format_message('오류가 발생하였습니다.\n ISBN을 입력해주세요\n')
	);
	const log_ref = useRef(null);

	const push_log = useCallback((line) => {
		const t = new Date().toLocaleTimeString();
		const el = log_ref.current;
		if (!el) return;
		el.textContent += `[${t}] ${line}\n`;
		el.scrollTop = el.scrollHeight;
	}, []);

	// 책 정보 오면 처리
	const handle_item_flow = (res) => {
		set_status('default');
		if (mode === 'rental') {
			if (res.data.item_copy.copy_status === 'available') {
				localStorage.setItem('item', JSON.stringify(res.data.item));
				localStorage.setItem('item_copy', JSON.stringify(res.data.item_copy));
				navigate('/info', { state: { mode } });
			} else {
				navigate('/result/failure', {
					state: { mode, state: 'is_rental' },
				});
			}
		} else {
			if (res.data.item_copy.copy_status === 'available') {
				navigate('/result/failure', { state: { mode, state: 'is_return' } });
			} else {
				localStorage.setItem('item', JSON.stringify(res.data.item));
				localStorage.setItem('item_copy', JSON.stringify(res.data.item_copy));
				navigate('/info', { state: { mode } });
			}
		}
	};

	const handle_manual_input = async (e) => {
		if (!manual_id.trim()) {
			set_message('ISBN을 입력하세요.');
			set_status('error');
			return;
		}
		try {
			const res = await manual_input_id(manual_id);
			// if (!res) {
			// 	set_message('책 정보가 없습니다.');
			// 	set_status('error');
			// 	return;
			// }
			if (res) handle_item_flow(res);
		} catch (e) {
			console.log(manual_id);
			set_message(format_message('책 정보가 없습니다\n'));
			set_status('error');
			return;
		}
	};

	const on_status = useCallback((s) => {
		if (s === 'started') set_status('connecting');
		else if (s === 'recognized') set_status('connected');
		else if (s === 'stopped') set_status('default');
		else if (s === 'error') set_status('error');
	}, []);

	const on_result = useCallback(
		async (m) => {
			// 서버가 recognized에 무엇을 주는지 따라 분기
			if (m.status === 'recognized') {
				// 1) 서버가 전체 item 정보를 줌 (data.item, data.item_copy)
				if (m.data?.item && m.data?.item_copy) {
					handle_item_flow({ data: m.data });
					return;
				}
				// 2) item_id만 옴 → API로 조회
				const id = m.item_id || m.title;
				if (id) {
					try {
						const res = await manual_input_id(id);
						if (res) {
							handle_item_flow(res);
							return;
						}
					} catch (e) {
						// 아래로 떨어져서 오류 처리
					}
				}
				set_message('인식은 되었으나 항목 조회에 실패했습니다.');
				set_status('error');
			} else if (m.status === 'not_found') {
				set_message('해당 항목을 찾을 수 없습니다.');
				set_status('error');
			} else if (m.status === 'timeout') {
				set_message('인식 시간이 초과되었습니다. ISBN을 입력하세요.');
				set_status('error');
			} else {
				set_message('서버 연결 실패! ISBN을 입력하세요');
			}
		},
		[handle_item_flow]
	);

	return (
		<div className="qrscan-content">
			<div className="video-container">
				{/* 실시간 스트림 캔버스 */}
				<StreamViewer url={STREAM_URL} width={320} height={240} />
				{/* 상태 텍스트 (네 기존 플레이스홀더 대체) */}
				{status === 'connecting' ? (
					<div className="video-placeholder">카메라 연결 중...</div>
				) : status === 'default' ? (
					<div className="video-placeholder">카메라 대기 중...</div>
				) : null}
			</div>

			<div className="qrscan-button-container">
				{/* 제어 UI + 결과 뱃지 + 로그 전달 */}
				<ScanControl
					url={CONTROL_URL}
					on_log={push_log}
					on_status={on_status}
					on_result={on_result}
				/>
				<Button onClick={() => navigate('/main')} class_name="default-button">
					홈으로
				</Button>
			</div>
			{status === 'error' && (
				<AlertModal
					message={message}
					on_close={() => {
						set_is_id_input(true);
						set_status('default');
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
							<Button onClick={handle_manual_input} class_name="mini-button">
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
