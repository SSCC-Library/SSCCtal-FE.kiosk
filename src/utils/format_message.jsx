import React from 'react';

export function format_message(template, values = {}) {
	let filled = template;

	// placeholder 치환
	for (const key in values) {
		const placeholder = `{${key}}`;
		filled = filled.replaceAll(placeholder, values[key]);
	}

	// 줄바꿈을 JSX로 변환
	return filled.split('\n').map((line, idx) => (
		<React.Fragment key={idx}>
			{line}
			<br />
		</React.Fragment>
	));
}
