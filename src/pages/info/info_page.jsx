import InfoForm from './info_form';
import './info.css';
import { useLocation } from 'react-router-dom';

function InfoPage() {
	const location = useLocation();
	const { item, mode } = location.state;
	const data = item.data;

	return (
		<div className="info-page">
			<div className="info-container">
				<div className="info-title">
					{mode === 'rental' ? '대여 하시겠습니까?' : '반납 하시겠습니까?'}
				</div>
				<div className="item-container"></div>
				<div className="item-picture"></div>
				<div className="item-title">책 제목: {data.title}</div>
				<div className="item-rental-date">대여 일자: 25.03.12</div>
				<div className="item-return-date">반납 일자: 25.03.26</div>
				<InfoForm item={data} mode={mode} />
			</div>
		</div>
	);
}

export default InfoPage;
