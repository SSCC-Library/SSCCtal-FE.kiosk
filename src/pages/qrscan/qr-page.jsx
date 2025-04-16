import QRForm from './qr-form';
import './qrscan.css';

function QRPage() {
	return (
		<div className="qrscan-page">
			<div className="qrscan-container">
				<div className="qrscan-title">QR 코드 인식</div>
				<div className="qrscan-label">카메라에서 10~15cm 떨어져 인식시켜주세요</div>
				<QRForm />
			</div>
		</div>
	);
}

export default QRPage;
