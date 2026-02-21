import { useMemo, useState } from 'react';
import AiChatSection from '../components/domain/dashboard/AiChatSection';
import CategoryPieChartSection, { PieChartDataItem } from '../components/domain/dashboard/CategoryPieChartSection';
import MonthlyBarChartSection, { ChartDataItem } from '../components/domain/dashboard/MonthlyBarChartSection';
import { useAiChat } from '../hooks/useAiChat';
import { useStatistics } from '../hooks/useStatistics';
import { useBookStore } from '../store/bookStore';

interface BarClickPayload {
  payload?: {
    month?: string;
  };
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

    return categoryData.map((cat) => ({
      name: cat.categoryName,
      value: cat.amount,
      percent: cat.percentage / 100,
    }));
  }, [categoryData]);

  // 채팅 전송
  const handleSend = () => {
    if (!message.trim() || aiLoading) return;

    sendMessage(message);
    setMessage('');
  };

  // 막대 차트 클릭
  const handleBarClick = (data: BarClickPayload, type: 'INCOME' | 'EXPENSE') => {
    if (data?.payload?.month) {
      setSelectedMonth(data.payload.month);
      setSelectedType(type);
      fetchCategoryStatistics(type);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <AiChatSection
          messages={messages}
          message={message}
          aiLoading={aiLoading}
          onChangeMessage={setMessage}
          onSend={handleSend}
        />

        {/* 시각적 분석 자료 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyBarChartSection
            chartData={chartData}
            onLegendTypeSelect={(type) => {
              setSelectedType(type);
              fetchCategoryStatistics(type);
            }}
            onBarClick={handleBarClick}
          />
          <CategoryPieChartSection
            selectedMonth={selectedMonth}
            selectedType={selectedType}
            pieChartData={pieChartData}
          />

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
