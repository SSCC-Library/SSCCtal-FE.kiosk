import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login_page';
import MainPage from '@/pages/main/main_page';
import QRPage from '@/pages/qrscan/qr_page';
import SuccessPage from './pages/result/success';
import FailurePage from './pages/result/failure';
import InfoPage from './pages/info/info_page';
import SignaturePage from './pages/signature_page';
import EnterPage from './pages/enter_page';
import PrePage from './pages/pre_page';

function Main() {
	return (
		<Routes>
			{/* <Route path="/" element={<LoginPage />} />
			<Route path="/main" element={<MainPage />} />
			<Route path="/qrscan" element={<QRPage />} />
			<Route path="/result/success" element={<SuccessPage />} />
			<Route path="/result/failure" element={<FailurePage />} />
			<Route path="/info" element={<InfoPage />} /> */}
			<Route path="/" element={<EnterPage />}></Route>
			<Route path="/pre" element={<PrePage />}></Route>
			<Route path="/signature" element={<SignaturePage />} />
		</Routes>
	);
}

export default Main;
