import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login_page';
import MainPage from '@/pages/main/main_page';
import QRPage from '@/pages/qrscan/qr_page';
import SuccessPage from './pages/result/success';
import FailurePage from './pages/result/failure';

function Main() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/main" element={<MainPage />} />
			<Route path="/qrscan" element={<QRPage />} />
			<Route path="/result/success" element={<SuccessPage />} />
			<Route path="/result/failure" element={<FailurePage />} />
		</Routes>
	);
}

export default Main;
