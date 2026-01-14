import { useEffect, useState } from 'react';
import { ledgerApi, statisticsApi } from '../api';
import { FinancialStatement } from '../api/types/ledger';
import { AccountBalanceResponse } from '../api/types/statistics';
import { useBookStore } from '../store/bookStore';

interface AccountData {
  accountId: number;
  accountName: string;
  transactions: Transaction[];
  balance: number;
}

interface Transaction {
  date: string;
  memo: string;
  debit: number;
  credit: number;
  balance: number;
}

function LedgerPage() {
  const { selectedBookId } = useBookStore();

  const [activeTab, setActiveTab] = useState<'summary' | number>('summary');
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [accountList, setAccountList] = useState<AccountBalanceResponse[]>([]); // 계정 목록
  const [accountLedgers, setAccountLedgers] = useState<AccountData[]>([]); // 원장 데이터
  const [summary, setSummary] = useState<FinancialStatement | null>(null);
  const [loading, setLoading] = useState(false);

  // 월 옵션 생성 (2025년 1월 ~ 12월)
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return { value: `2025-${month}`, label: `2025년 ${i + 1}월` };
  });

  useEffect(() => {
    if (!selectedBookId) return;
    fetchInitialData();
  }, [selectedBookId]);

  useEffect(() => {
    if (!selectedBookId) return;
    fetchSummary();
    // 월 변경 시 원장 데이터 초기화
    setAccountLedgers([]);
  }, [selectedBookId, selectedMonth]);

  const fetchInitialData = async () => {
    if (!selectedBookId) return;

    setLoading(true);
    try {
      // 계정 목록 조회 (잔액 API 활용)
      const accountsResponse = await statisticsApi.getAccountBalances(selectedBookId);
      setAccountList(accountsResponse.data.data);

      // 재무제표 조회
      const summaryResponse = await ledgerApi.getFinancialStatement(selectedBookId, selectedMonth);
      setSummary(summaryResponse.data.data);

    } catch (error) {
      console.error('데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    if (!selectedBookId) return;

    try {
      const summaryResponse = await ledgerApi.getFinancialStatement(selectedBookId, selectedMonth);
      setSummary(summaryResponse.data.data);
    } catch (error) {
      console.error('재무제표 조회 실패:', error);
    }
  };

  const fetchAccountLedger = async (accountId: number, accountName: string) => {
    if (!selectedBookId) return;

    try {
      const response = await ledgerApi.getAccountLedger(selectedBookId, accountId, selectedMonth);
      const data = response.data.data;

      const accountData: AccountData = {
        accountId,
        accountName: data.accountName || accountName,
        balance: data.closingBalance,
        transactions: data.entries.map(entry => ({
          date: entry.date,
          memo: entry.description,
          debit: entry.debit,
          credit: entry.credit,
          balance: entry.balance,
        })),
      };

      setAccountLedgers(prev => {
        const exists = prev.find(a => a.accountId === accountId);
        if (exists) {
          return prev.map(a => a.accountId === accountId ? accountData : a);
        }
        return [...prev, accountData];
      });

    } catch (error) {
      console.error('계정 원장 조회 실패:', error);
    }
  };

  const handleAccountClick = (accountId: number, accountName: string) => {
    setActiveTab(accountId);

    // 이미 조회한 데이터가 없으면 조회
    const existingLedger = accountLedgers.find(a => a.accountId === accountId);
    if (!existingLedger) {
      fetchAccountLedger(accountId, accountName);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">

        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            회계 장부
          </h1>
          <div className="flex gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {monthOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition">
              📥 Excel 다운로드
            </button>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === 'summary'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            📊 재무 요약
          </button>
          {accountList.map((account) => (
            <button
              key={account.accountId}
              onClick={() => handleAccountClick(account.accountId, account.accountName)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === account.accountId
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {account.accountName}
            </button>
          ))}
        </div>

        {/* 재무 요약 */}
        {activeTab === 'summary' && summary && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              📊 재무 요약 ({selectedMonth})
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 손익계산서 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📈 손익계산서</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">총 수입</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      +{summary.incomeStatement.totalIncome.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">총 지출</span>
                    <span className="font-mono text-red-600 dark:text-red-400">
                      -{summary.incomeStatement.totalExpense.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                    <span className="text-gray-900 dark:text-white">순이익</span>
                    <span className={`font-mono ${summary.incomeStatement.netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {summary.incomeStatement.netProfit >= 0 ? '+' : ''}{summary.incomeStatement.netProfit.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 재무상태표 */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📋 재무상태표</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">총 자산</span>
                    <span className="font-mono text-gray-900 dark:text-white">
                      {summary.balanceSheet.totalAssets.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">총 부채</span>
                    <span className="font-mono text-gray-900 dark:text-white">
                      {summary.balanceSheet.totalLiabilities.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                    <span className="text-gray-900 dark:text-white">총 자본</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      {summary.balanceSheet.totalEquity.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 계정별 원장 */}
        {activeTab !== 'summary' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
            {(() => {
              const currentLedger = accountLedgers.find(a => a.accountId === activeTab);
              const currentAccount = accountList.find(a => a.accountId === activeTab);

              if (!currentLedger) {
                return (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    로딩 중...
                  </div>
                );
              }

              return (
                <>
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      📄 {currentLedger.accountName} 원장 ({selectedMonth})
                    </h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      현재 잔액: <span className="font-mono font-bold text-gray-900 dark:text-white">{currentLedger.balance.toLocaleString()}원</span>
                    </div>
                  </div>

                  {currentLedger.transactions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      해당 월에 거래 내역이 없습니다.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs font-bold text-gray-900 dark:text-white">
                              날짜
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs font-bold text-gray-900 dark:text-white">
                              적요
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-xs font-bold text-gray-900 dark:text-white">
                              차변
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-xs font-bold text-gray-900 dark:text-white">
                              대변
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-xs font-bold text-gray-900 dark:text-white">
                              잔액
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentLedger.transactions.map((tx, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                {tx.date}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                {tx.memo}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-blue-600 dark:text-blue-400">
                                {tx.debit > 0 ? `${tx.debit.toLocaleString()}원` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-red-600 dark:text-red-400">
                                {tx.credit > 0 ? `${tx.credit.toLocaleString()}원` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-gray-900 dark:text-white">
                                {tx.balance.toLocaleString()}원
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
}

export default LedgerPage;