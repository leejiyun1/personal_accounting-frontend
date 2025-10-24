/**
 * 사용자 메시지 상수
 */
export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: '이메일과 비밀번호를 입력해주세요.',
  LOGIN_FAILED: '로그인에 실패했습니다.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  UNAUTHORIZED: '권한이 없습니다.',
  NOT_FOUND: '요청하신 리소스를 찾을 수 없습니다.',
} as const;

export const SUCCESS_MESSAGES = {
  BOOK_CREATED: '장부가 생성되었습니다.',
  BOOK_DELETED: '장부가 삭제되었습니다.',
  TRANSACTION_CREATED: '거래가 등록되었습니다.',
} as const;