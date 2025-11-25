import { useMemo, useState } from 'react';
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
import { useAiChat } from '../hooks/useAiChat';
import { useStatistics } from '../hooks/useStatistics';
import { useBookStore } from '../store/bookStore';

interface ChartDataItem {
  month: string;
  monthName: string;
  income: number;
  expense: number;
}

interface PieChartDataItem {
  name: string;
  value: number;
  percent: number;
}

function DashboardPage() {
  const { selectedBookId } = useBookStore();

  const currentMonthName = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedType, setSelectedType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');

  // 통계 훅 사용
  const {
    monthlySummary,
    categoryData,
    fetchCategoryStatistics,
  } = useStatistics({ bookId: selectedBookId, yearMonth: selectedMonth });

  // AI 채팅 훅 사용
  const { messages, isLoading: aiLoading, sendMessage } = useAiChat(selectedBookId);
  const [message, setMessage] = useState('');

  // 최근 12개월 데이터만 필터링
  const filteredMonthlySummary = useMemo(() => {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const startYearMonth = `${twelveMonthsAgo.getFullYear()}-${String(twelveMonthsAgo.getMonth() + 1).padStart(2, '0')}`;

    return monthlySummary.filter(item => item.yearMonth >= startYearMonth);
  }, [monthlySummary]);

  // 차트용 데이터 변환
  const chartData: ChartDataItem[] = useMemo(() => {
  return filteredMonthlySummary.map(item => ({
      month: item.yearMonth,
      monthName: `${item.yearMonth.split('-')[1]}월`,
      income: item.income,
      expense: item.expense,
    }));
  }, [filteredMonthlySummary]);

  // 도넛 차트용 데이터 변환
  const pieChartData: PieChartDataItem[] = useMemo(() => {
    if (!categoryData || !Array.isArray(categoryData)) return [];

    return categoryData.map((cat: any) => ({
      name: cat.categoryName,
      value: cat.amount,
      percent: cat.percentage / 100,
    }));
  }, [categoryData]);

  // 도넛 차트 색상
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#f97316'];

  // 채팅 전송
  const handleSend = () => {
    if (!message.trim() || aiLoading) return;

    sendMessage(message);
    setMessage('');
  };

  // 막대 차트 클릭
  const handleBarClick = (data: any, type: 'INCOME' | 'EXPENSE') => {
    if (data?.payload?.month) {
      setSelectedMonth(data.payload.month);
      setSelectedType(type);
      fetchCategoryStatistics(type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
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
              disabled={aiLoading}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={aiLoading}
              className="px-6 py-2.5 text-white bg-primary-600 hover:bg-primary-700 rounded-lg font-medium disabled:opacity-50"
            >
              {aiLoading ? '전송 중...' : '전송'}
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
                    if (e.dataKey === 'income') {
                      setSelectedType('INCOME');
                      fetchCategoryStatistics('INCOME');
                    }
                    if (e.dataKey === 'expense') {
                      setSelectedType('EXPENSE');
                      fetchCategoryStatistics('EXPENSE');
                    }
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
                    data={pieChartData as any}
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
                    {pieChartData.map((entry: PieChartDataItem, index: number) => (
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