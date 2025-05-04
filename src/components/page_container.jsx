import './page_container.css';

export function PageContainer({ children, title, title_color }) {
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
