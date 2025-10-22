import { useState } from 'react';
import TransactionModal from '../components/TransactionModal';
import { booksData } from '../data/dummyData';

function BooksPage() {
  const [books] = useState(booksData);
  const [selectedBookId, setSelectedBookId] = useState<number>(books[0]?.id || 1);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  // 선택된 장부
  const selectedBook = books.find(book => book.id === selectedBookId);

  // 총 잔액 계산
  const getTotalBalance = (accounts: any[]) => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  };

  // 장부 타입 이모지
  const getBookIcon = (type: string) => {
    return type === 'PERSONAL' ? '📕' : '💼';
  };

  // 모달 열기
  const openModal = (accountName: string) => {
    setSelectedAccount(accountName);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">

          {/* 헤더 */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              내 장부
            </h1>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition">
              + 새 장부 만들기
            </button>
          </div>

          {books.length === 0 ? (
            // 빈 상태
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                장부가 없습니다
              </p>
              <p className="text-gray-400 dark:text-gray-500">
                "새 장부 만들기" 버튼을 클릭하여 시작하세요
              </p>
            </div>
          ) : (
            <>
              {/* 장부 선택 탭 */}
              <div className="flex gap-3 mb-6">
                {books.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => setSelectedBookId(book.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${selectedBookId === book.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                      }`}
                  >
                    <span className="text-xl">{getBookIcon(book.bookType)}</span>
                    {book.name}
                  </button>
                ))}
              </div>

              {/* 선택된 장부 정보 */}
              {selectedBook && (
                <>
                  {/* 총 잔액 카드 */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 mb-6">
                    <p className="text-white text-sm mb-2">총 잔액</p>
                    <p className="text-white text-4xl font-bold">
                      {getTotalBalance(selectedBook.accounts).toLocaleString()}원
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      {selectedBook.accounts.length}개 계정
                    </p>
                  </div>

                  {/* 계정 카드 그리드 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedBook.accounts.map((account, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
                      >
                        {/* 계정 이름 */}
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {account.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded ${account.balance >= 0
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                          >
                            {account.balance >= 0 ? '자산' : '부채'}
                          </span>
                        </div>

                        {/* 잔액 */}
                        <p
                          className={`text-3xl font-bold ${account.balance >= 0
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                          {account.balance.toLocaleString()}원
                        </p>

                        {/* 상세보기 링크 */}
                        <button
                          onClick={() => openModal(account.name)}
                          className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          거래 내역 보기 →
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

        </div>
      </div>

      {/* 거래 내역 모달 */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookId={selectedBookId}
        accountName={selectedAccount}
      />
    </>
  );
}

export default BooksPage;