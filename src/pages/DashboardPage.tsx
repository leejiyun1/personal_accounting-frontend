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
import { categoryDataByMonth, monthlyData } from '../data/dummyData';

function DashboardPage() {
  // ========== 상태 관리 ==========

  // 채팅 상태
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?' }
  ]);

  // 차트 상태
  const currentMonthName = `${new Date().getMonth() + 1}월`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');

  // ========== 데이터 계산 ==========

  // 오늘부터 최근 12개월 데이터 동적 계산
  const last12MonthsData = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const result = [];

    for (let i = 11; i >= 0; i--) {
      let year = currentYear;
      let month = currentMonth - i;

      if (month <= 0) {
        month += 12;
        year -= 1;
      }

      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      const data = monthlyData.find(d => d.month === monthKey);

      if (data) {
        result.push(data);
      }
    }

    return result;
  }, []);

  // 현재 선택된 카테고리 데이터
  const currentCategoryData = categoryDataByMonth[selectedMonth]?.[selectedType] || [];

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

  // ========== 렌더링 ==========

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* AI 채팅 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI 가계부 도우미
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
              📈 최근 12개월 수입/지출
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={last12MonthsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${value.toLocaleString()}원`}
                  cursor={false}
                />
                <Legend
                  onClick={(e) => {
                    if (e.dataKey === 'income' || e.dataKey === 'expense') {
                      setSelectedType(e.dataKey as 'income' | 'expense');
                    }
                  }}
                  wrapperStyle={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  name="지출"
                  isAnimationActive={false}
                  onClick={(data) => {
                    if (data?.payload?.monthName) {
                      setSelectedMonth(data.payload.monthName);
                      setSelectedType('expense');
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                />
                <Bar
                  dataKey="income"
                  fill="#3b82f6"
                  name="수입"
                  isAnimationActive={false}
                  onClick={(data) => {
                    if (data?.payload?.monthName) {
                      setSelectedMonth(data.payload.monthName);
                      setSelectedType('income');
                    }
                  }}
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
              🍕 {selectedMonth} {selectedType === 'income' ? '수입' : '지출'} 상세
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              막대를 클릭하여 월별 데이터를 확인하세요
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentCategoryData}
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
                  {currentCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      style={{ outline: 'none' }}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()}원`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;