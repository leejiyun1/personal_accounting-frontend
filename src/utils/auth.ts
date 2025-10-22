export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    // JWT 페이로드 디코딩
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    return parseInt(payload.sub);
  } catch (error) {
    console.error('토큰 파싱 실패:', error);
    return null;
  }
};
