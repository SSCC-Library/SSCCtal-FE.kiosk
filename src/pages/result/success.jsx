/*
success 페이지
- 대여/반납 성공 시 상태에 따라 성공 메시지/타이틀 분기
*/

import { useNavigate, useLocation } from 'react-router-dom';
import successImg from '@/assets/success.png';
import Button from '@/components/button';
import { PageContainer } from '@/components/page_container';
import './success.css';

function SuccessPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mode, type } = location.state;

	return (
		<PageContainer title={mode === 'rental' ? '대여 성공' : '반납 성공'} title_color="#2e5bff">
			<div className="success-content">
				<img src={successImg} alt="성공 이미지" className="success-image" />
				<div className="success-label">
					{mode === 'rental' ? '대여가' : '반납이'} 완료되었습니다.
				</div>
				<Button
					onClick={() => {
						localStorage.removeItem('item');
						navigate('/main');
					}}
					class_name="default-button"
				>
					확인
				</Button>
			</div>
		</PageContainer>
	);
}

export default SuccessPage;
