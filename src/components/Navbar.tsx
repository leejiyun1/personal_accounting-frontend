import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { booksApi } from '../api';
import { useBookStore } from '../store/bookStore';

function Navbar() {
  const { books, selectedBookId, setBooks, setSelectedBookId } = useBookStore();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksApi.getBooks();
        const bookList = response.data.data || [];
        setBooks(bookList);
        if (bookList.length > 0 && !selectedBookId) {
          setSelectedBookId(bookList[0].id);
        }
      } catch (error) {
        console.error('장부 목록 조회 실패:', error);
      }
    };
    fetchBooks();
  }, [selectedBookId, setBooks, setSelectedBookId]);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          {/* 로고 */}
          <Link to="/dashboard" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Personal Accounting
            </span>
          </Link>

          {/* 메뉴 */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:items-center">
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                >
                  대시보드
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                >
                  장부
                </Link>
              </li>
              <li>
                <Link
                  to="/analysis"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                >
                  경영 분석
                </Link>
              </li>
              <li>
                <Link
                  to="/ledger"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                >
                  회계 장부
                </Link>
              </li>
            </ul>
          </div>

          {/* 오른쪽 영역 */}
          <div className="flex items-center gap-4 lg:order-2">
            {/* 장부 선택 */}
            {books.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">장부:</span>
                <select
                  value={selectedBookId || ''}
                  onChange={(e) => setSelectedBookId(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 로그아웃 */}
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              로그아웃
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;