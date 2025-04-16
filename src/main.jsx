import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/login-page';

function Main() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
		</Routes>
	);
}

export default Main;
