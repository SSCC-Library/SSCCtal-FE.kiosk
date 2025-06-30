/*
줄바꿈을 위한 유틸 함수
- 탬플릿 문자열의 key를 values 객체의 값으로 치환
- \n 을 <br/>로 변환하여 줄바꿈 적용
*/

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
