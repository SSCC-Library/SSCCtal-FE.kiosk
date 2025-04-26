import React, { useState, useEffect } from 'react';
import Button from '@/components/button';
import './qrscan.css';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoStream from '@/components/video_stream';
import { qrScanStart } from '@/api/qr_api';

function QRForm() {
	const navigate = useNavigate();
	const [is_requesting, set_is_requesting] = useState(false);
	const [is_camera_on, set_is_camera_on] = useState(false);
	const location = useLocation();
	const { mode } = location.state || {};
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user) {
			alert('잘못된 접근입니다. 로그인 후 이용하세요.');
			navigate('/');
		}
	}, [user, navigate]);

	if (!user) return null;
	//const mode = 'rental';

	const handle_qr_scan = async () => {
		// set_is_camera_on(false);
		// set_is_requesting(false);

		try {
			//set_is_requesting(true);
			const res = await qrScanStart();
			//set_is_camera_on(true);

			if (res.success === false) {
				alert(res.message || 'QR 인식 실패');
				navigate('/qrscan', { state: { mode } });
			} else if (res.success === true) {
				if (mode === 'rental') {
					if (res.status === 'available') {
						localStorage.setItem('item', JSON.stringify(res));
						// const current_rentals = user[item.type];
						// if (!current_rentals || current_rentals.length === 0) navigate('/info');
						// else
						// 	navigate('/result/failure', {
						// 		state: { mode, type: item.type, state: 'over_rental' },
						// 	});
						navigate('/info', { state: { mode } });
					} else
						navigate('/result/failure', {
							state: { mode, state: 'is_rental' },
						});
				} else {
					if (res.status === 'available')
						navigate('/result/failure', { state: { mode, state: 'is_return' } });
				}
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

	return (
		<div>
			{is_camera_on && <VideoStream />}
			<Button onClick={handle_qr_scan} class_name="picture-button" disabled={is_requesting}>
				촬영
			</Button>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}

export default QRForm;
