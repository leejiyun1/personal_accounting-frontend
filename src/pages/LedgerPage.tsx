import { useEffect, useState } from 'react';
import { ledgerApi } from '../api';
import { FinancialStatementResponse } from '../api/types/ledger';
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
  const [selectedMonth, setSelectedMonth] = useState('2025-10');
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [summary, setSummary] = useState<FinancialStatementResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedBookId) return;
    fetchLedgerData();
  }, [selectedBookId, selectedMonth]);

  const fetchLedgerData = async () => {
    if (!selectedBookId) return;

    setLoading(true);
    try {
      // 재무제표 조회
      const summaryResponse = await ledgerApi.getFinancialStatement(selectedBookId, selectedMonth);
      setSummary(summaryResponse.data.data);

      // 계정 목록은 별도 API 필요 (TODO: 계정 목록 API 추가)
      setAccounts([]);

    } catch (error) {
      console.error('장부 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountLedger = async (accountId: number) => {
    if (!selectedBookId) return;

    try {
      const response = await ledgerApi.getAccountLedger(selectedBookId, accountId, selectedMonth);
      const data = response.data.data;

      const accountData: AccountData = {
        accountId,
        accountName: data.accountName,
        balance: data.closingBalance,
        transactions: data.entries.map(entry => ({
          date: entry.date,
          memo: entry.description,
          debit: entry.debit,
          credit: entry.credit,
          balance: entry.balance,
        })),
      };

      setAccounts(prev => {
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

  useEffect(() => {
    if (activeTab !== 'summary' && typeof activeTab === 'number') {
      const account = accounts.find(a => a.accountId === activeTab);
      if (!account) {
        fetchAccountLedger(activeTab);
      }
    }
  }, [activeTab]);

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
              <option value="2025-10">2025년 10월</option>
              <option value="2025-09">2025년 9월</option>
              <option value="2025-08">2025년 8월</option>
            </select>
            <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition">
              📥 Excel 다운로드
            </button>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap transition border-b-2 ${
              activeTab === 'summary'
                ? 'bg-white dark:bg-gray-800 border-primary-600 text-primary-600'
                : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            재무 요약
          </button>
          {accounts.map((account) => (
            <button
              key={account.accountId}
              onClick={() => setActiveTab(account.accountId)}
              className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap transition border-b-2 ${
                activeTab === account.accountId
                  ? 'bg-white dark:bg-gray-800 border-primary-600 text-primary-600'
                  : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
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

            {/* 손익계산서 */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">손익계산서</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">총 수입</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {summary.incomeStatement.totalIncome.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">총 지출</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {summary.incomeStatement.totalExpense.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between font-bold text-green-600 dark:text-green-400 pt-2 border-t">
                  <span>순이익</span>
                  <span className="font-mono">
                    {summary.incomeStatement.netIncome.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 재무상태표 */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">재무상태표</h3>
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
                <div className="flex justify-between font-bold text-blue-600 dark:text-blue-400 pt-2 border-t">
                  <span>총 자본</span>
                  <span className="font-mono">
                    {summary.balanceSheet.totalEquity.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 계정별 원장 */}
        {activeTab !== 'summary' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                📄 {accounts.find(a => a.accountId === activeTab)?.accountName} 원장
              </h2>
            </div>

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
                {accounts.find(a => a.accountId === activeTab)?.transactions.map((tx, idx) => (
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

      </div>
    </div>
  );
}

export default LedgerPage;