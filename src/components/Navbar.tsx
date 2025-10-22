import { Link } from 'react-router-dom';

function Navbar() {
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

          {/* 오른쪽 버튼 */}
          <div className="flex items-center lg:order-2">
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              로그아웃
            </Link>
          </div>

          {/* 메뉴 */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
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
                  to="/statistics"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white"
                >
                  재무제표
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
