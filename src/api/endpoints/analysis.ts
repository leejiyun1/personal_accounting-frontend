import { apiClient } from '../client';
import { AnalysisResponse } from '../types/analysis';
import { ApiResponse } from '../types/common';

export const analysisApi = {
  getAnalysis: (bookId: number, yearMonth: string) =>
    apiClient.get<ApiResponse<AnalysisResponse>>(`/analysis/${bookId}`, {
      params: { yearMonth }
    }),
};