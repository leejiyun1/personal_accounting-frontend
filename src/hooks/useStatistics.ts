import { useEffect, useState } from 'react';
import { statisticsApi } from '../api';
import { CategoryStatisticsResponse, MonthlySummary } from '../api/types/statistics';

interface UseStatisticsParams {
  bookId: number | null;
  yearMonth?: string;
}

export const useStatistics = ({ bookId, yearMonth }: UseStatisticsParams) => {
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryStatisticsResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 월별 요약 조회
  const fetchMonthlySummary = async () => {
    if (!bookId) return;

    setIsLoading(true);
    try {
      const response = await statisticsApi.getMonthlySummary(bookId);
      setMonthlySummary(response.data.data || []);
    } catch (error) {
      console.error('월별 요약 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리별 통계 조회
  const fetchCategoryStatistics = async (type: 'INCOME' | 'EXPENSE') => {
    if (!bookId || !yearMonth) return;

    try {
      const response = await statisticsApi.getCategoryStatistics(bookId, {
        yearMonth,
        type,
      });
      setCategoryData(response.data.data);
    } catch (error) {
      console.error('카테고리 통계 조회 실패:', error);
    }
  };

  // bookId 변경 시 월별 요약 자동 조회
  useEffect(() => {
    if (bookId) {
      fetchMonthlySummary();
    }
  }, [bookId]);

  return {
    monthlySummary,
    categoryData,
    isLoading,
    fetchMonthlySummary,
    fetchCategoryStatistics,
  };
};