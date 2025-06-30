/*
QR 페이지
안내 문구와 스타일 포함, 전체 레이아웃 컨테이너 역할
*/

import QRForm from './qr_form';
import './qrscan.css';
import { PageContainer } from '@/components/page_container';
function QRPage() {
	return (
		<PageContainer title="QR 코드 인식" title_color="#003c9e">
			<div className="qrscan-label">카메라에서 10~15cm 떨어져 인식시켜주세요</div>
			<QRForm />
		</PageContainer>
	);
}

export default QRPage;
