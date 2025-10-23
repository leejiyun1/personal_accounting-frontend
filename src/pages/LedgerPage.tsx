import { useEffect, useState } from 'react';
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
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (!selectedBookId) return;
    fetchLedgerData();
  }, [selectedBookId, selectedMonth]);

  const fetchLedgerData = async () => {
    try {
      // TODO: API 구현
      // 임시 더미 데이터
      setAccounts([
        {
          accountId: 1,
          accountName: '현금',
          balance: 2100,
          transactions: [
            { date: '10/01', memo: '이월잔액', debit: 0, credit: 0, balance: 1000 },
            { date: '10/02', memo: '웹개발', debit: 500, credit: 0, balance: 1500 },
            { date: '10/03', memo: '식자재', debit: 0, credit: 200, balance: 1300 },
          ]
        },
        {
          accountId: 2,
          accountName: '매출',
          balance: 5000,
          transactions: [
            { date: '10/02', memo: 'A고객', debit: 500, credit: 0, balance: 500 },
            { date: '10/05', memo: 'B고객', debit: 800, credit: 0, balance: 1300 },
          ]
        },
        {
          accountId: 3,
          accountName: '재료비',
          balance: 2200,
          transactions: [
            { date: '10/03', memo: '식자재', debit: 200, credit: 0, balance: 200 },
          ]
        }
      ]);

      setSummary({
        expenses: [
          { name: '재료비', amount: 22000000 },
          { name: '인건비', amount: 8000000 },
          { name: '임차료', amount: 5000000 },
          { name: '광고선전비', amount: 2000000 },
          { name: '통신비', amount: 1000000 },
          { name: '기타비용', amount: 1500000 },
        ],
        revenues: [
          { name: '매출', amount: 50000000 },
          { name: '용역수입', amount: 5000000 },
          { name: '기타수익', amount: 500000 },
        ],
        totalExpense: 39500000,
        totalRevenue: 55500000,
        netIncome: 16000000,
        beginningBalance: 10000000,
        endingBalance: 26000000,
      });
    } catch (error) {
      console.error('장부 조회 실패:', error);
    }
  };

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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-300 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                📊 재무 요약 ({selectedMonth})
              </h2>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-bold text-gray-900 dark:text-white">
                    비용 (차변)
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-bold text-gray-900 dark:text-white">
                    금액
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-bold text-gray-900 dark:text-white">
                    수익 (대변)
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-bold text-gray-900 dark:text-white">
                    금액
                  </th>
                </tr>
              </thead>
              <tbody>
                {Math.max(summary.expenses.length, summary.revenues.length) > 0 &&
                  Array.from({
                    length: Math.max(summary.expenses.length, summary.revenues.length)
                  }).map((_, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                        {summary.expenses[index]?.name || ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-gray-900 dark:text-white">
                        {summary.expenses[index] ? `${summary.expenses[index].amount.toLocaleString()}원` : ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                        {summary.revenues[index]?.name || ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-gray-900 dark:text-white">
                        {summary.expenses[index] ? `${summary.expenses[index].amount.toLocaleString()}원` : ''}
                      </td>
                    </tr>
                  ))}

                {/* 합계 행 */}
                <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white">
                    비용 합계
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-gray-900 dark:text-white">
                    {summary.totalExpense.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white">
                    수익 합계
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-gray-900 dark:text-white">
                    {summary.totalRevenue.toLocaleString()}원
                  </td>
                </tr>

                {/* 순이익 행 */}
                <tr className="bg-green-50 dark:bg-green-900/20 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-green-700 dark:text-green-400">
                    순이익
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-green-700 dark:text-green-400">
                    {summary.netIncome.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>

                {/* 빈 행 */}
                <tr>
                  <td colSpan={4} className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>

                {/* 잔액 변동 */}
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                    기초잔액
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-gray-900 dark:text-white">
                    {summary.beginningBalance.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
                    순이익
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-green-600 dark:text-green-400">
                    +{summary.netIncome.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-blue-700 dark:text-blue-400">
                    기말잔액
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right font-mono text-blue-700 dark:text-blue-400">
                    {summary.endingBalance.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
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
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs font-bold text-gray-900 dark:text-white uppercase">
                    차변 (입금)
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-xs font-bold text-gray-900 dark:text-white uppercase">
                    금액
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-xs font-bold text-gray-900 dark:text-white uppercase">
                    대변 (출금)
                  </th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right text-xs font-bold text-gray-900 dark:text-white uppercase">
                    금액
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 기초잔액 */}
                <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-white">
                    기초잔액
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-gray-900 dark:text-white">
                    {accounts.find(a => a.accountId === activeTab)?.transactions[0]?.balance.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>

                {/* 거래 내역 */}
                {(() => {
                  const account = accounts.find(a => a.accountId === activeTab);
                  const debits = account?.transactions.filter(tx => tx.debit > 0) || [];
                  const credits = account?.transactions.filter(tx => tx.credit > 0) || [];
                  const maxLength = Math.max(debits.length, credits.length);

                  return Array.from({ length: maxLength }).map((_, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {debits[index] ? `${debits[index].date} ${debits[index].memo}` : ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-blue-600 dark:text-blue-400">
                        {debits[index] ? `${debits[index].debit.toLocaleString()}원` : ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                        {credits[index] ? `${credits[index].date} ${credits[index].memo}` : ''}
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-red-600 dark:text-red-400">
                        {credits[index] ? `${credits[index].credit.toLocaleString()}원` : ''}
                      </td>
                    </tr>
                  ));
                })()}

                {/* 합계 */}
                <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-white">
                    합계
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-gray-900 dark:text-white">
                    {accounts
                      .find(a => a.accountId === activeTab)
                      ?.transactions.reduce((sum, tx) => sum + tx.debit, 0)
                      .toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-white">
                    합계
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-gray-900 dark:text-white">
                    {accounts
                      .find(a => a.accountId === activeTab)
                      ?.transactions.reduce((sum, tx) => sum + tx.credit, 0)
                      .toLocaleString()}원
                  </td>
                </tr>

                {/* 기말잔액 */}
                <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-900 dark:text-white">
                    기말잔액
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-right font-mono text-gray-900 dark:text-white">
                    {accounts.find(a => a.accountId === activeTab)?.balance.toLocaleString()}원
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default LedgerPage;