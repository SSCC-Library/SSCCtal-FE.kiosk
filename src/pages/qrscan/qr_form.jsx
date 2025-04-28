import React, { useState, useEffect } from 'react';
import Button from '@/components/button';
import './qrscan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoStream from '@/components/video_stream';
import { qrScanStart } from '@/api/qr_api';
import { manual_input_id } from '@/api/manual_input_api';
import { use_user } from '@/hooks/use_user';
import InputField from '@/components/input_field';

function QRForm() {
	const navigate = useNavigate();
	const [is_requesting, set_is_requesting] = useState(false);
	const [is_camera_on, set_is_camera_on] = useState(false);
	const [is_id_input, set_is_id_input] = useState(false);
	const [manual_id, set_manual_id] = useState('');
	const location = useLocation();
	const { mode } = location.state || {};
	const user = use_user();

	//const mode = 'rental';

	const handle_qr_scan = async () => {
		// set_is_camera_on(false);
		// set_is_requesting(false);

		try {
			//set_is_requesting(true);
			//const res = await qrScanStart();
			//set_is_camera_on(true);
			const res = { success: false };
			if (res.success === false) {
				alert('QR 인식이 실패하였습니다. ISBN을 직접 입력해주세요');
				set_is_id_input(true);
			} else if (res.success === true) {
				handle_item_flow(res);
			}
			// const dummy_data = {
			// 	success: true,
			// 	code: 200,
			// 	data: {
			// 		type: 'book',
			// 		title: '혼자 공부하는 파이썬',
			// 		status: 'available',
			// 		//img = {이미지 파일}
			// 	},
			// };
			// navigate('/info', { state: { mode, item: dummy_data } });
		} catch (err) {
			console.error('QR 요청 실패:', err);
			alert('요청 중 오류 발생');
		} finally {
			set_is_camera_on(false);
			set_is_requesting(false);
		}
	};

	const handle_item_input = async () => {
		try {
			const res = await manual_input_id(manual_id);

			if (res.success === true) {
				handle_item_flow(res);
			} else {
				alert('동아리에 없는 도서입니다. 다시 입력해주세요');
			}
		} catch (err) {
			console.error('요청 실패:', err);
			alert('서버와 연결 실패');
		}
	};

	const handle_item_flow = (res) => {
		if (mode === 'rental') {
			if (res.status === 'available') {
				localStorage.setItem('item', JSON.stringify(res));
				// if (user.rental_item.length === 0) navigate('/info', { state: { mode } });
				// else {
				// 	localStorage.removeItem('item');
				// 	navigate('/result/failure', {
				// 		state: { mode, state: 'over_rental' },
				// 	});
				// }
				navigate('/info', { state: { mode } });
			} else
				navigate('/result/failure', {
					state: { mode, state: 'is_rental' },
				});
		} else {
			if (res.status === 'available')
				navigate('/result/failure', { state: { mode, state: 'is_return' } });
			else {
				if (res.item_id === user.rental_item) {
					localStorage.setItem('item', JSON.stringify(res));
					navigate('/info', { state: { mode } });
				} else navigate('/result/failure', { state: { mode, state: 'dif_return' } });
			}
		}
	};

	return (
		<div className="qrscan-content">
			<div className="video-container">
				{is_camera_on ? (
					<VideoStream />
				) : (
					<div className="video-placeholder">카메라 대기 중...</div>
				)}
			</div>
			<div className="qrscan-button-container">
				<Button
					onClick={handle_qr_scan}
					class_name="default-button"
					disabled={is_requesting}
				>
					촬영
				</Button>
				<Button onClick={() => navigate('/main')} class_name="default-button">
					홈으로
				</Button>
			</div>
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
							<Button onClick={handle_item_input} class_name="mini-button">
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
