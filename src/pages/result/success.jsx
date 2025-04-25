import Button from '@/components/button';
import './success.css';
import { useNavigate, useLocation } from 'react-router-dom';
import successImg from '@/assets/success.png';

function SuccessPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { mode, type } = location.state;

	return (
		<div className="success-container">
			<img src={successImg} alt="성공 이미지" className="success-image" />
			<div className="title">{mode === 'rental' ? '대여' : '반납'} 성공</div>
			<div className="success-label">
				{type === 'book' ? '도서' : '물품'} {mode === 'rental' ? '대여가' : '반납이'}{' '}
				완료되었습니다.
			</div>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}

export default SuccessPage;
