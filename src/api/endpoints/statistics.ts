import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  SummaryResponse,
  CategoryStatisticsResponse,
  SummaryParams,
  CategoryStatisticsParams,
} from '../types/statistics';

export const statisticsApi = {
  getSummary: (params: SummaryParams) =>
    apiClient.get<ApiResponse<SummaryResponse>>('/statistics/summary', {
      params,
    }),

  getCategoryStatistics: (params: CategoryStatisticsParams) =>
    apiClient.get<ApiResponse<CategoryStatisticsResponse>>('/statistics/category', {
      params,
    }),
};
