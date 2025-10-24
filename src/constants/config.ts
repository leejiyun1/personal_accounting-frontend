/**
 * 애플리케이션 설정 상수
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 10000,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const DATE_FORMAT = {
  DISPLAY: 'YYYY-MM-DD',
  API: 'YYYY-MM-DD',
} as const;