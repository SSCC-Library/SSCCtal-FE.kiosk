/*
모든 페이지의 기본 틀이 되는
컨테이너 컴포넌트
*/

import './page_container.css';

export function PageContainer({ title, title_color, children }) {
	return (
		<div className="page-container">
			{title && (
				<div className="page-title" style={{ color: title_color }}>
					{title}
				</div>
			)}
			{children}
		</div>
	);
}
