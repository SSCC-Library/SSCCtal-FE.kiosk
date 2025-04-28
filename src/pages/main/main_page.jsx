import MainForm from './main_form';
import './main.css';
import { use_user } from '@/hooks/use_user';
function MainPage() {
	const user = use_user();

	if (!user) return null;

	return (
		<div className="main-container">
			<div className="main-title">SSCCtal</div>
			<div className="main-label">{user.name}님 환영합니다</div>
			<MainForm />
		</div>
	);
}
/*function MainPage() {
	const location = useLocation();
	const user = location.state?.user;

	return (
		<div className="main-page">
			<div className="main-container">
				<div className="title">SCLibrary</div>
				<div className="label">
					{user ? `${user.name}님 환영합니다` : '비로그인 상태 (개발 중)'}
				</div>
				<MainForm />
			</div>
		</div>
	);
}*/

export default MainPage;
