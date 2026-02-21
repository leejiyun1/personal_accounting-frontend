import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface ChartDataItem {
  month: string;
  monthName: string;
  income: number;
  expense: number;
}

interface BarClickPayload {
  payload?: {
    month?: string;
  };
}

interface MonthlyBarChartSectionProps {
  chartData: ChartDataItem[];
  onLegendTypeSelect: (type: 'INCOME' | 'EXPENSE') => void;
  onBarClick: (data: BarClickPayload, type: 'INCOME' | 'EXPENSE') => void;
}

function MonthlyBarChartSection({
  chartData,
  onLegendTypeSelect,
  onBarClick,
}: MonthlyBarChartSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        월별 수입/지출
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip formatter={(value) => `${Number(value).toLocaleString()}원`} cursor={false} />
          <Legend
            onClick={(e) => {
              if (e.dataKey === 'income') {
                onLegendTypeSelect('INCOME');
              }
              if (e.dataKey === 'expense') {
                onLegendTypeSelect('EXPENSE');
              }
            }}
            wrapperStyle={{ cursor: 'pointer' }}
          />
          <Bar
            dataKey="expense"
            fill="#ef4444"
            name="지출"
            isAnimationActive={false}
            onClick={(data) => onBarClick(data, 'EXPENSE')}
            style={{ cursor: 'pointer' }}
          />
          <Bar
            dataKey="income"
            fill="#3b82f6"
            name="수입"
            isAnimationActive={false}
            onClick={(data) => onBarClick(data, 'INCOME')}
            style={{ cursor: 'pointer' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyBarChartSection;
