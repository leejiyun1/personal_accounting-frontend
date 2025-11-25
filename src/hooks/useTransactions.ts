import { useEffect, useMemo, useState } from 'react';
import { transactionsApi } from '../api';

interface UseTransactionsParams {
  bookId: number;
  accountId?: number;
  enabled: boolean; // 모달 열림 여부
}

export const useTransactions = ({ bookId, accountId, enabled }: UseTransactionsParams) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  // 거래 내역 조회
  const fetchTransactions = async () => {
    if (!bookId) return;

    setIsLoading(true);
    try {
      const response = await transactionsApi.getTransactions({
        bookId,
        ...(accountId && { accountId }), // accountId가 있을 때만 포함
      });
      setTransactions(response.data.data || []); // content가 아니라 직접 배열
    } catch (error) {
      console.error('거래 내역 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // enabled 변경 시 조회
  useEffect(() => {
    if (enabled) {
      fetchTransactions();
    }
  }, [enabled, bookId, accountId]);

  // 필터링 및 정렬
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // 타입 필터
    if (filterType !== 'ALL') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // 정렬
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [transactions, filterType, sortOrder]);

  // 통계 계산
  const stats = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    const totalExpense = filteredTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      count: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  return {
    transactions: filteredTransactions,
    isLoading,
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
    stats,
  };
};