import { useState } from 'react';
import { balanceSheet, booksData, cashFlow, incomeStatement } from '../data/dummyData';

type ReportType = 'income' | 'balance' | 'cash';

function StatisticsPage() {
  // 사업 장부만 필터링
  const businessBooks = booksData.filter(book => book.bookType === 'BUSINESS');

  const [selectedBookId, setSelectedBookId] = useState<number>(businessBooks[0]?.id || 2);
  const [selectedReport, setSelectedReport] = useState<ReportType>('income');

  // 선택된 장부
  const selectedBook = businessBooks.find(book => book.id === selectedBookId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">

        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            재무제표
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            세무 신고용 재무제표 (개인사업자)
          </p>
        </div>

        {businessBooks.length === 0 ? (
          // 사업 장부 없음
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
              사업 장부가 없습니다
            </p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              재무제표는 사업 장부에서만 조회할 수 있습니다.
            </p>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition">
              사업 장부 만들기
            </button>
          </div>
        ) : (
          <>
            {/* 장부 선택 (사업 장부만) */}
            {businessBooks.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  사업 장부 선택
                </label>
                <div className="flex gap-3">
                  {businessBooks.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => setSelectedBookId(book.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
                        selectedBookId === book.id
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <span className="text-xl">💼</span>
                      {book.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 사업자 정보 카드 */}
            {selectedBook && (
              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {selectedBook.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      사업자 번호: 123-45-67890 (더미 데이터)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 재무제표 탭 */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setSelectedReport('income')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  selectedReport === 'income'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                📊 손익계산서
              </button>
              <button
                onClick={() => setSelectedReport('balance')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  selectedReport === 'balance'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                📈 재무상태표
              </button>
              <button
                onClick={() => setSelectedReport('cash')}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  selectedReport === 'cash'
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                💰 현금흐름표
              </button>
            </div>

            {/* 손익계산서 (실제 양식) */}
            {selectedReport === 'income' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                {/* 제목 */}
                <div className="border-b-4 border-gray-800 dark:border-gray-200 px-6 py-6 bg-white dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                    손 익 계 산 서
                  </h2>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    (Income Statement)
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    사업자명: {selectedBook?.name}
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {incomeStatement.period.startDate} 부터 {incomeStatement.period.endDate} 까지
                  </p>
                  <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                    (단위: 원)
                  </p>
                </div>

                {/* 표 */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-800 dark:border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 w-1/2">
                        과 목
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700">
                        금 액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* I. 매출액 */}
                    <tr className="border-t border-gray-300 dark:border-gray-600">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        I. 매출액
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {incomeStatement.revenue.total.toLocaleString()}
                      </td>
                    </tr>
                    {incomeStatement.revenue.details.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-gray-700 dark:text-gray-300 text-sm">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* II. 매출원가 */}
                    <tr className="border-t-2 border-gray-400 dark:border-gray-500">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        II. 매출원가
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {incomeStatement.expense.total.toLocaleString()}
                      </td>
                    </tr>
                    {incomeStatement.expense.details.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-gray-700 dark:text-gray-300 text-sm">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* III. 매출총이익 */}
                    <tr className="border-t-2 border-gray-800 dark:border-gray-200 bg-blue-50 dark:bg-blue-900/20">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        III. 매출총이익 (순이익)
                      </td>
                      <td className="px-6 py-3 text-right text-lg font-bold text-blue-600 dark:text-blue-400">
                        {incomeStatement.netIncome.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 하단 */}
                <div className="border-t-4 border-gray-800 dark:border-gray-200 px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    위 금액은 2025년 귀속 소득세 신고를 위한 손익계산서입니다.
                  </p>
                </div>
              </div>
            )}

            {/* 재무상태표 (실제 양식) */}
            {selectedReport === 'balance' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                {/* 제목 */}
                <div className="border-b-4 border-gray-800 dark:border-gray-200 px-6 py-6 bg-white dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                    재 무 상 태 표
                  </h2>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    (Balance Sheet)
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    사업자명: {selectedBook?.name}
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {balanceSheet.asOfDate} 현재
                  </p>
                  <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                    (단위: 원)
                  </p>
                </div>

                {/* 표 */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-800 dark:border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 w-1/2">
                        과 목
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700">
                        금 액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* I. 자산 */}
                    <tr className="border-t border-gray-300 dark:border-gray-600">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        I. 자산
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {balanceSheet.assets.total.toLocaleString()}
                      </td>
                    </tr>
                    {balanceSheet.assets.details.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-gray-700 dark:text-gray-300 text-sm">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* II. 부채 */}
                    <tr className="border-t-2 border-gray-400 dark:border-gray-500">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        II. 부채
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {balanceSheet.liabilities.total.toLocaleString()}
                      </td>
                    </tr>
                    {balanceSheet.liabilities.details.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-gray-700 dark:text-gray-300 text-sm">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* III. 자본 */}
                    <tr className="border-t-2 border-gray-800 dark:border-gray-200 bg-primary-50 dark:bg-primary-900/20">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        III. 자본 (자산 - 부채)
                      </td>
                      <td className="px-6 py-3 text-right text-lg font-bold text-primary-600 dark:text-primary-400">
                        {balanceSheet.equity.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 하단 */}
                <div className="border-t-4 border-gray-800 dark:border-gray-200 px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    위 금액은 {balanceSheet.asOfDate} 현재 재무상태를 나타냅니다.
                  </p>
                </div>
              </div>
            )}

            {/* 현금흐름표 (실제 양식) */}
            {selectedReport === 'cash' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                {/* 제목 */}
                <div className="border-b-4 border-gray-800 dark:border-gray-200 px-6 py-6 bg-white dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                    현 금 흐 름 표
                  </h2>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                    (Cash Flow Statement)
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    사업자명: {selectedBook?.name}
                  </p>
                  <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {cashFlow.period.startDate} 부터 {cashFlow.period.endDate} 까지
                  </p>
                  <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                    (단위: 원)
                  </p>
                </div>

                {/* 표 */}
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-800 dark:border-gray-200">
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 w-1/2">
                        과 목
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700">
                        금 액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 기초잔액 */}
                    <tr className="border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        기초 현금 잔액
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {cashFlow.summary.startingBalance.toLocaleString()}
                      </td>
                    </tr>

                    {/* I. 영업활동 현금흐름 (유입) */}
                    <tr className="border-t-2 border-gray-400 dark:border-gray-500">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        I. 영업활동으로 인한 현금흐름 (유입)
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        {cashFlow.summary.totalIncome.toLocaleString()}
                      </td>
                    </tr>
                    {cashFlow.incomeDetails.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-blue-600 dark:text-blue-400 text-sm">
                          {item.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}

                    {/* II. 영업활동 현금흐름 (유출) */}
                    <tr className="border-t-2 border-gray-400 dark:border-gray-500">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        II. 영업활동으로 인한 현금흐름 (유출)
                      </td>
                      <td className="px-6 py-3 text-right font-bold text-gray-900 dark:text-white">
                        ({cashFlow.summary.totalExpense.toLocaleString()})
                      </td>
                    </tr>
                    {cashFlow.expenseDetails.map((item, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-2 text-gray-700 dark:text-gray-300 pl-12 text-sm">
                          {item.category}
                        </td>
                        <td className="px-6 py-2 text-right text-red-600 dark:text-red-400 text-sm">
                          ({item.amount.toLocaleString()})
                        </td>
                      </tr>
                    ))}

                    {/* 기말잔액 */}
                    <tr className="border-t-2 border-gray-800 dark:border-gray-200 bg-green-50 dark:bg-green-900/20">
                      <td className="px-6 py-3 font-bold text-gray-900 dark:text-white">
                        기말 현금 잔액
                      </td>
                      <td className="px-6 py-3 text-right text-lg font-bold text-green-600 dark:text-green-400">
                        {cashFlow.summary.endingBalance.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* 하단 */}
                <div className="border-t-4 border-gray-800 dark:border-gray-200 px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    위 현금흐름표는 기간 중 현금의 유입과 유출을 나타냅니다.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default StatisticsPage;