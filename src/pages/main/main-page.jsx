import MainForm from './main-form';
import './main.css';

function MainPage() {
	return (
		<div className="main-container">
			<div className="title">SCLibrary</div>
			<div className="label">환영합니다</div>
			<MainForm />
		</div>
	);
}

export default MainPage;
