import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartDataItem {
  [key: string]: string | number;
  name: string;
  value: number;
  percent: number;
}

interface CategoryPieChartSectionProps {
  selectedMonth: string;
  selectedType: 'INCOME' | 'EXPENSE';
  pieChartData: PieChartDataItem[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#f97316'];

function CategoryPieChartSection({
  selectedMonth,
  selectedType,
  pieChartData,
}: CategoryPieChartSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" key={`${selectedMonth}-${selectedType}`}>
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
              label={(entry) => {
                const name = String(entry.name ?? '');
                const percent = Number(entry.percent ?? 0);
                return `${name} ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius={80}
              dataKey="value"
              isAnimationActive
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-out"
            >
              {pieChartData.map((_, index: number) => (
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
  );
}

export default CategoryPieChartSection;
