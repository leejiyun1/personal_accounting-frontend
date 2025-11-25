import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  AccountBalanceResponse,
  CategoryStatisticsParams,
  CategoryStatisticsResponse,
  MonthlySummaryResponse,
} from '../types/statistics';

export const statisticsApi = {
  // 월별 요약 통계 (최근 6개월)
  getMonthlySummary: (bookId: number) =>
    apiClient.get<ApiResponse<MonthlySummaryResponse[]>>(`/statistics/monthly/${bookId}`),

  // 카테고리별 통계
  getCategoryStatistics: (bookId: number, params: CategoryStatisticsParams) =>
    apiClient.get<ApiResponse<CategoryStatisticsResponse[]>>(`/statistics/category/${bookId}`, {
      params,
    }),

  // 계정별 잔액 조회
  getAccountBalances: (bookId: number) =>
    apiClient.get<ApiResponse<AccountBalanceResponse[]>>(`/statistics/balances/${bookId}`),
};