import { useEffect, useState } from 'react';
import { booksApi, statisticsApi } from '../api';
import BookCreateModal from '../components/BookCreateModal';
import TransactionModal from '../components/TransactionModal';

function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [accountBalances, setAccountBalances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 1. 장부 목록 조회
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksApi.getBooks();
        const bookList = response.data.data || [];
        setBooks(bookList);
        if (bookList.length > 0) {
          setSelectedBookId(bookList[0].id);
        }
      } catch (error) {
        console.error('장부 목록 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 2. 계정 잔액 조회
  useEffect(() => {
    if (!selectedBookId) return;

    const fetchBalances = async () => {
      try {
        const response = await statisticsApi.getAccountBalances({ bookId: selectedBookId });
        setAccountBalances(response.data.data || []);
      } catch (error) {
        console.error('계정 잔액 조회 실패:', error);
      }
    };
    fetchBalances();
  }, [selectedBookId]);

  const selectedBook = books.find(book => book.id === selectedBookId);

  const getTotalBalance = () => {
    return accountBalances.reduce((sum, acc) => sum + acc.balance, 0);
  };

  const getBookIcon = (type: string) => {
    return type === 'personal' ? '📕' : '💼';
  };

  const openModal = (accountId: number) => {
    setSelectedAccountId(accountId);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              내 장부
            </h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
            >
              + 새 장부 만들기
            </button>
          </div>

          {books.length === 0 ? (
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

              {selectedBook && (
                <>
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 mb-6">
                    <p className="text-white text-sm mb-2">총 잔액</p>
                    <p className="text-white text-4xl font-bold">
                      {getTotalBalance().toLocaleString()}원
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      {accountBalances.length}개 계정
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accountBalances.map((account) => (
                      <div
                        key={account.accountId}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {account.accountName}
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

                        <p
                          className={`text-3xl font-bold ${account.balance >= 0
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-red-600 dark:text-red-400'
                            }`}
                        >
                          {account.balance.toLocaleString()}원
                        </p>

                        <button
                          onClick={() => openModal(account.accountId)}
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

      <BookCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => window.location.reload()}
      />
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookId={selectedBookId || 0}
        accountId={selectedAccountId || 0}
      />
    </>
  );
}

export default BooksPage;