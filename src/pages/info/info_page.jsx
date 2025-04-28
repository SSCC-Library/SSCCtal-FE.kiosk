import InfoForm from './info_form';
import './info.css';
import { useLocation } from 'react-router-dom';
import { use_get_date } from '@/hooks/use_get_date';
import default_image from '@/assets/default_book.png';
function InfoPage() {
	const location = useLocation();
	// const { item, mode } = location.state;
	// const data = item.data;

	const item = JSON.parse(localStorage.getItem('item'));
	const { mode } = location.state;
	const { current_string, return_string } = use_get_date();

	return (
		<div className="info-container">
			<div className="info-title">
				{mode === 'rental' ? '대여 하시겠습니까?' : '반납 하시겠습니까?'}
			</div>
			<div className="item-container">
				<div className="item-picture">
					<img src={item.img || default_image} />
				</div>

				<div className="item-info">
					<div className="item-title">책 제목: {item.title}</div>
					<div className="item-rental-date">대여 일자: {current_string}</div>
					<div className="item-return-date">반납 일자: {return_string}</div>
				</div>
			</div>
			<InfoForm
				item={item}
				mode={mode}
				current_date={current_string}
				return_date={return_string}
			/>
		</div>
	);
}

export default InfoPage;
