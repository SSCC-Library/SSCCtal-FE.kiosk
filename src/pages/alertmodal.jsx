// src/components/alert_modal.jsx
import React from 'react';

function AlertModal({ message, onClose }) {
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1000,
				fontFamily: 'GongGothicMedium', // ✅ 오타 수정
			}}
		>
			<div
				style={{
					position: 'fixed',
					backgroundColor: 'white',
					top: '20%',
					left: '50%',
					transform: 'translateX(-50%) scale(2)', // ✅ 확대 효과
					padding: '30px 40px',
					borderRadius: '12px',
					textAlign: 'center',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
					fontSize: '18px',
				}}
			>
				<p style={{ marginBottom: '20px' }}>{message}</p>
				<button
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						border: '1px solid #ccc',
						borderRadius: '6px',
						backgroundColor: 'white',
						color: 'black',
						cursor: 'pointer',
					}}
					onClick={onClose}
				>
					확인
				</button>
			</div>
		</div>
	);
}

export default AlertModal;
