import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  AccountBalanceParams,
  AccountBalanceResponse,
  CategoryStatisticsParams,
  CategoryStatisticsResponse,
  SummaryParams,
  SummaryResponse,
} from '../types/statistics';

export const statisticsApi = {
  getSummary: (params: SummaryParams) =>
  apiClient.get<ApiResponse<SummaryResponse[]>>('/statistics/summary', {
    params,
  }),

  getCategoryStatistics: (params: CategoryStatisticsParams) =>
    apiClient.get<ApiResponse<CategoryStatisticsResponse>>('/statistics/category', {
      params,
    }),

  getAccountBalances: (params: AccountBalanceParams) =>
    apiClient.get<ApiResponse<AccountBalanceResponse[]>>('/statistics/accounts', {
      params,
    }),
};