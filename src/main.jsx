import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login-page';
import MainPage from '@/pages/main/main-page';

function Main() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/main" element={<MainPage />} />
		</Routes>
	);
}

export default Main;
