import { useTransactions } from '../../hooks/useTransactions';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: number;
  accountId: number;
}

function TransactionModal({ isOpen, onClose, bookId, accountId }: TransactionModalProps) {
  const {
    transactions,
    accountName,
    isLoading,
    filterType,
    setFilterType,
    sortOrder,
    setSortOrder,
    stats,
  } = useTransactions({
    bookId,
    accountId,
    enabled: isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-4">

        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {accountName || '거래 내역'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              계정별 원장 조회
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">로딩 중...</p>
            </div>
          ) : (
            <>
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 입금</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.totalIncome.toLocaleString()}원
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 출금</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {stats.totalExpense.toLocaleString()}원
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">잔액</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {stats.balance.toLocaleString()}원
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">거래 건수</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {stats.count}건
                  </p>
                </div>
              </div>

              {/* 필터 및 정렬 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterType('ALL')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterType === 'ALL'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      전체
                    </button>
                    <button
                      onClick={() => setFilterType('INCOME')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterType === 'INCOME'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      입금
                    </button>
                    <button
                      onClick={() => setFilterType('EXPENSE')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        filterType === 'EXPENSE'
                          ? 'bg-red-600 text-white'
                          : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      출금
                    </button>
                  </div>

                  <div className="ml-auto">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
                      className="bg-white dark:bg-gray-600 border-none text-gray-900 dark:text-white rounded-lg p-2"
                    >
                      <option value="latest">최신순</option>
                      <option value="oldest">오래된순</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 거래 목록 */}
              {transactions.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400">
                    거래 내역이 없습니다
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          날짜
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          구분
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          적요
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                          금액
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                transaction.type === 'INCOME'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >
                              {transaction.type === 'INCOME' ? '입금' : '출금'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {transaction.memo || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                            <span
                              className={
                                transaction.type === 'INCOME'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-red-600 dark:text-red-400'
                              }
                            >
                              {transaction.type === 'INCOME' ? '+' : '-'}
                              {Number(transaction.amount).toLocaleString()}원
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default TransactionModal;