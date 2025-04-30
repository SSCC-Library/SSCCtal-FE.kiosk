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
			<div className="success-content">
				<div className="success-title">{mode === 'rental' ? '대여' : '반납'} 성공</div>
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
		</div>
	);
}

export default SuccessPage;
