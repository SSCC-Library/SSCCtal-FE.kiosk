/*
info 페이지
- 대여/반납 플로우 분기 렌더링
- 날짜 정보 불러옴 (use_get_date)
- InfoForm에서 실제 대여/반납 서버 전송 처리
*/

import InfoForm from './info_form';
import { useLocation } from 'react-router-dom';
import default_image from '@/assets/default_book.png';
import { PageContainer } from '@/components/page_container';
import { use_get_date } from '@/hooks/use_get_date';
import './info.css';

function InfoPage() {
	const location = useLocation();
	// const { item, mode } = location.state;
	// const data = item.data;

	const item = JSON.parse(localStorage.getItem('item'));
	const item_copy = JSON.parse(localStorage.getItem('item_copy'));
	const { mode } = location.state;
	const { current_string, next_string } = use_get_date();

	return (
		<PageContainer
			title={mode === 'rental' ? '대여 하시겠습니까?' : '반납 하시겠습니까?'}
			title_color="#003c9e"
		>
			<div className="item-container">
				<div className="item-picture">
					<img src={item.image_url || default_image} />
				</div>

				<div className="item-info">
					<div className="item-title">책 제목: {item.name}</div>
					{mode === 'rental' && (
						<>
							<div className="item-rental-date">
								대여 일자: {current_string.replace('T', ' / ').replace('Z', '')}
							</div>
							<div className="item-return-date">반납 예정 일자: {next_string}</div>
						</>
					)}
					{mode === 'return' && (
						<>
							<div className="item-rental-date">
								{/* 대여 일자: {current_string.replace('T', ' / ').replace('Z', '')} */}
								{/* 대여 일자: {item.rental_date.replace('T', ' / ').replace('Z', '')} */}
								{/* 반납 시 대여일자는 기존 대여 일자가 표시되어야 함 */}
							</div>
							<div className="item-return-date">
								{/* 반납 일자: {current_string.replace('T', ' / ').replace('Z', '')} */}
							</div>
						</>
					)}
				</div>
			</div>
			<InfoForm item_copy={item_copy} mode={mode} />
		</PageContainer>
	);
}

export default InfoPage;
