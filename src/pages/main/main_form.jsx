import React, { useState } from 'react';
import Button from '@/components/button';
import './main.css';
import { useNavigate } from 'react-router-dom';
import { INFO_MESSAGES } from '@/constants/messages';
import AlertModal from '@/components/alert_modal';
import { qrScanStart } from '../../api/qr_api';
function MainForm() {
	const navigate = useNavigate();
	const [is_open, set_is_open] = useState(false);
	const [message, set_message] = useState('');

	const handle_qr_scan = async () => {
		try {
			const res = await qrScanStart();
			if (res.success === false) {
				alert('QR 인식이 실패하였습니다. ISBN을 직접 입력해주세요');
				set_is_id_input(true);
			} else if (res.success === true) {
				handle_item_flow(res);
			}
		} catch (err) {
			console.error('QR 요청 실패:', err);
			alert('요청 중 오류 발생');
		}
	};

	return (
		<div className="main-button-wrapper">
			<div className="main-button-container">
				<Button
					onClick={() => navigate('/qrscan', { state: { mode: 'rental' } })}
					class_name="square-button"
				>
					대여
				</Button>
				<Button
					onClick={() => navigate('/qrscan', { state: { mode: 'return' } })}
					class_name="square-button"
				>
					반납
				</Button>
				{/* <Button onClick={() => handle_qr_scan()} class_name="square-button">
					대여
				</Button>
				<Button onClick={() => handle_qr_scan()} class_name="square-button">
					반납
				</Button> */}
			</div>
			<Button onClick={() => navigate('/')} class_name="default-button">
				로그아웃
			</Button>
			{/* <Button
				onClick={() => {
					set_message(format_message(INFO_MESSAGES.alert_admin));
					set_is_open(true);
				}}
				class_name="admin-button"
			>
				문의하기
			</Button>
			{is_open && <AlertModal message={message} on_close={() => set_is_open(false)} />} */}
		</div>
	);
}

export default MainForm;
