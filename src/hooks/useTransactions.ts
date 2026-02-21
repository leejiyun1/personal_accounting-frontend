import { useCallback, useEffect, useMemo, useState } from 'react';
import { ledgerApi } from '../api';
import { getRecentYearMonths } from '../utils/dateRange';

interface UseTransactionsParams {
  bookId: number;
  accountId?: number;
  enabled: boolean; // 모달 열림 여부
  recentMonths?: number;
}

interface LedgerEntry {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export const useTransactions = ({
  bookId,
  accountId,
  enabled,
  recentMonths = 13,
}: UseTransactionsParams) => {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [accountName, setAccountName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  // 원장 조회 (전체 기간)
  const fetchLedger = useCallback(async () => {
    if (!bookId || !accountId) return;

    setIsLoading(true);
    try {
      // Recent N months 조회 후 합치기 (월별 실패는 무시)
      const allEntries: LedgerEntry[] = [];
      const yearMonths = getRecentYearMonths({ months: recentMonths });

      for (const yearMonth of yearMonths) {
        try {
          const response = await ledgerApi.getAccountLedger(bookId, accountId, yearMonth);
          const data = response.data.data;

          if (data.accountName) {
            setAccountName(data.accountName);
          }

          if (data.entries && data.entries.length > 0) {
            allEntries.push(...data.entries);
          }
        } catch {
          // 해당 월 조회 실패 시 다음 월 계속 진행
        }
      }

      setEntries(allEntries);
    } catch (error) {
      console.error('원장 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [accountId, bookId, recentMonths]);

  // enabled 변경 시 조회
  useEffect(() => {
    if (enabled && accountId) {
      fetchLedger();
    }
  }, [enabled, accountId, fetchLedger]);

  // 거래 형태로 변환 (debit > 0 이면 지출 or 수입, credit > 0 이면 반대)
  const transactions = useMemo(() => {
    return entries.map((entry, index) => {
      // debit > 0: 해당 계정으로 들어온 것 (결제수단이면 수입)
      // credit > 0: 해당 계정에서 나간 것 (결제수단이면 지출)
      const isIncome = entry.debit > 0;
      const amount = entry.debit > 0 ? entry.debit : entry.credit;
      
      return {
        id: index,
        date: entry.date,
        type: isIncome ? 'INCOME' : 'EXPENSE',
        amount: amount,
        memo: entry.description,
        balance: entry.balance,
      };
    });
  }, [entries]);

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
    const totalIncome = transactions
      .filter(t => t.type === 'INCOME')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    const totalExpense = transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      count: transactions.length,
    };
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    accountName,
    isLoading,
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
    stats,
  };
};
