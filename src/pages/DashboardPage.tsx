import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { booksApi, statisticsApi } from '../api';

function DashboardPage() {
  // ========== 상태 관리 ==========
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 채팅 상태
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: '안녕하세요! AI 시드입니다.' }
  ]);

  // 차트 상태
  const currentMonthName = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedType, setSelectedType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  // ========== API 호출 ==========

  // 1. 장부 목록 가져오기 (최초 1회)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await booksApi.getBooks();
        const bookList = response.data.data || [];
        setBooks(bookList);

        // 첫 번째 장부 자동 선택
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

  // 2. 월별 요약 데이터 가져오기
  useEffect(() => {
    if (!selectedBookId) return;

    const fetchMonthlySummary = async () => {
      try {
        const response = await statisticsApi.getSummary({ bookId: selectedBookId });
        setMonthlySummary(response.data.data || []);
      } catch (error) {
        console.error('월별 요약 조회 실패:', error);
      }
    };

    fetchMonthlySummary();
  }, [selectedBookId]);

  // 3. 카테고리 통계 가져오기
  useEffect(() => {
    if (!selectedBookId) return;

    const fetchCategoryStats = async () => {
      try {
        const response = await statisticsApi.getCategoryStatistics({
          bookId: selectedBookId,
          yearMonth: selectedMonth,
          type: selectedType,
        });
        setCategoryData(response.data.data);
      } catch (error) {
        console.error('카테고리 통계 조회 실패:', error);
      }
    };

    fetchCategoryStats();
  }, [selectedBookId, selectedMonth, selectedType]);

  // ========== 데이터 계산 ==========

  // 차트용 데이터 변환
  const chartData = useMemo(() => {
    return monthlySummary.map(item => ({
      month: item.yearMonth,
      monthName: `${item.yearMonth.split('-')[1]}월`,
      income: item.totalIncome,
      expense: item.totalExpense,
    }));
  }, [monthlySummary]);

  // 도넛 차트용 데이터 변환
  const pieChartData = useMemo(() => {
    if (!categoryData?.categories) return [];

    return categoryData.categories.map((cat: any) => ({
      name: cat.categoryName,
      value: cat.amount,
      percent: cat.percentage / 100,
    }));
  }, [categoryData]);

  // 도넛 차트 색상
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#f97316'];

  // ========== 이벤트 핸들러 ==========

  // 채팅 전송
  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: 'user', content: message }]);
    setMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'ai', content: '네, 알겠습니다. 거래를 기록했습니다!' }
      ]);
    }, 1000);
  };

  // 막대 차트 클릭
  const handleBarClick = (data: any, type: 'INCOME' | 'EXPENSE') => {
    if (data?.payload?.month) {
      setSelectedMonth(data.payload.month);
      setSelectedType(type);
    }
  };

  // ========== 렌더링 ==========

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">장부가 없습니다.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">먼저 장부를 생성해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* 장부 선택 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            장부 선택
          </label>
          <select
            value={selectedBookId || ''}
            onChange={(e) => setSelectedBookId(Number(e.target.value))}
            className="w-full md:w-auto bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.name} ({book.bookType === 'personal' ? '개인' : '사업'})
              </option>
            ))}
          </select>
        </div>

        {/* AI 채팅 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            AI 시드
          </h2>

          {/* 채팅 메시지 */}
          <div className="space-y-4 mb-4 h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2.5 text-white bg-primary-600 hover:bg-primary-700 rounded-lg font-medium"
            >
              전송
            </button>
          </div>
        </div>

        {/* 시각적 분석 자료 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 월별 수입/지출 막대 차트 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              월별 수입/지출
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${Number(value).toLocaleString()}원`}
                  cursor={false}
                />
                <Legend
                  onClick={(e) => {
                    if (e.dataKey === 'income') setSelectedType('INCOME');
                    if (e.dataKey === 'expense') setSelectedType('EXPENSE');
                  }}
                  wrapperStyle={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name="지출"
                  isAnimationActive={false}
                  onClick={(data) => handleBarClick(data, 'EXPENSE')}
                  style={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="income"
                  fill="#3b82f6"
                  name="수입"
                  isAnimationActive={false}
                  onClick={(data) => handleBarClick(data, 'INCOME')}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 카테고리별 도넛 차트 */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            key={`${selectedMonth}-${selectedType}`}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {selectedMonth} {selectedType === 'INCOME' ? '수입' : '지출'} 상세
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              막대를 클릭하여 월별 데이터를 확인하세요
            </p>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => {
                      const { name, percent } = entry;
                      return `${name} ${(percent * 100).toFixed(0)}%`;
                    }}
                    outerRadius={80}
                    dataKey="value"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={500}
                    animationEasing="ease-out"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toLocaleString()}원`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                데이터가 없습니다
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;