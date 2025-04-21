import Button from '@/components/button';
import './success.css';
import { useNavigate, useLocation } from 'react-router-dom';
import successImg from '@/assets/success.png';

function SuccessPage() {
	const navigate = useNavigate();
	const location = useLocation();
	//const { mode, type } = location.state || {};
	const mode = '대여';
	const type = '도서';
	return (
		<div className="success-container">
			<img src={successImg} alt="성공 이미지" className="success-image" />
			<div className="title">{mode} 성공</div>
			<div className="success-label">
				{type} {mode === '대여' ? '대여가' : '반납이'} 완료되었습니다.
			</div>
			<Button onClick={() => navigate('/main')} class_name="main-button">
				홈으로
			</Button>
		</div>
	);
}

export default SuccessPage;
