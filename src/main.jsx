/*
전체 라우팅 담당, 각 페이지별 path와 컴포넌트 지정
*/

import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login_page';
import MainPage from '@/pages/main/main_page';
import QRPage from '@/pages/qrscan/qr_page';
import SuccessPage from './pages/result/success';
import FailurePage from './pages/result/failure';
import InfoPage from './pages/info/info_page';

function Main() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/main" element={<MainPage />} />
			<Route path="/qrscan" element={<QRPage />} />
			<Route path="/result/success" element={<SuccessPage />} />
			<Route path="/result/failure" element={<FailurePage />} />
			<Route path="/info" element={<InfoPage />} />
		</Routes>
	);
}

export default Main;
