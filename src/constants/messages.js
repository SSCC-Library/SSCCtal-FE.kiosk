/*
메세지를 상수 컴포넌트로 정리
*/
const ADMIN_NUMBER = import.meta.env.VITE_ADMIN_NUMBER;

export const ERROR_MESSAGES = {
	invalid_login: '학번 혹은 비밀번호를 잘못 입력하였습니다. \n{count}번 남았습니다.',
	invalid_syntax: '학번은 숫자로 입력해주세요. \n{count}번 남았습니다.',
	token_not_find: '토큰이 발급되지 않았습니다',
	login_fail: '로그인 요청 실패',
	user_not_found: 'SSCC 회원이 아닙니다',
	over_rental: '대여 가능 개수를 초과하였습니다',
	is_rental: '이미 대여중 입니다',
	is_return: '이미 반납 처리 되었습니다',
	unknown: '알 수 없는 오류가 발생했습니다',
	dif_return: '대여 기록이 없습니다',
};

export const SUCCESS_MESSAGES = {
	login_success: '숭실대학교 학생입니다.',
	logout_success: '정상적으로 로그아웃 되었습니다.',
};

export const INFO_MESSAGES = {
	redirecting: '10초 후 자동으로 이동합니다.',
	too_many_attempts: '로그인 시도 횟수를 초과했습니다. \n{time}초 후 다시 시도하세요.',
	alert_admin: `관리자에게 문의하세요\n${ADMIN_NUMBER}`,
};
