/**
 * 애플리케이션 라우트 경로 상수
 */
export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  BOOKS: '/books',
  ANALYSIS: '/analysis',
  LEDGER: '/ledger',
} as const;

export type RouteType = typeof ROUTES[keyof typeof ROUTES];