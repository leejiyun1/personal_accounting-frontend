import { useEffect, useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { useBookStore } from '../store/bookStore';

function AnalysisPage() {
  const { selectedBookId } = useBookStore();

  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(0);

  // 갱신 가능 여부 (1시간)
  const canRefresh = timeUntilRefresh <= 0;

  // 분석 데이터 가져오기
  useEffect(() => {
    if (!selectedBookId) return;

    // TODO: API 호출
    fetchAnalysis();
  }, [selectedBookId]);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    try {
      // TODO: API 구현
      // const response = await analysisApi.getAnalysis(selectedBookId);

      // 임시 더미 데이터
      setAnalysis({
        summary: "매출은 증가했지만 순이익은 그대로입니다.",
        trendData: [
          { month: '1월', sales: 450, expense: 380, profit: 70 },
          { month: '2월', sales: 470, expense: 390, profit: 80 },
          { month: '3월', sales: 480, expense: 400, profit: 80 },
          { month: '4월', sales: 490, expense: 410, profit: 80 },
          { month: '5월', sales: 500, expense: 420, profit: 80 },
          { month: '6월', sales: 510, expense: 430, profit: 80 },
          { month: '7월', sales: 515, expense: 440, profit: 75 },
          { month: '8월', sales: 520, expense: 455, profit: 65 },
          { month: '9월', sales: 525, expense: 470, profit: 55 },
          { month: '10월', sales: 530, expense: 490, profit: 40 },
        ],
        metrics: {
          sales: { value: 8, trend: 'up' },
          expense: { value: 15, trend: 'up' },
          profit: { value: 0, trend: 'neutral' }
        },
        insight: {
          description: "재료비 증가율이 매출 증가율을 초과하여 순이익 개선이 없었습니다.",
          possibleCauses: [
            "특정 이벤트로 인한 할인/증정",
            "재료비 단가 인상",
            "대량 재고 구매"
          ],
          actionItems: [
            "이벤트: 신규 고객 재방문율",
            "재료비 인상: 공급처 재협상",
            "매출 증가 지속: 대량구매 할인"
          ]
        }
      });

      setLastAnalysisTime(new Date());
    } catch (error) {
      console.error('분석 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (!canRefresh) return;
    fetchAnalysis();
  };

  // 남은 시간 계산
  useEffect(() => {
    if (!lastAnalysisTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = 60 - Math.floor((now.getTime() - lastAnalysisTime.getTime()) / 60000);
      setTimeUntilRefresh(Math.max(0, diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastAnalysisTime]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">분석 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            경영 분석
          </h1>
          <button
            onClick={handleRefresh}
            disabled={!canRefresh || isLoading}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              canRefresh
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            🔄 분석 갱신
          </button>
        </div>

        {!canRefresh && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
            갱신 가능: {timeUntilRefresh}분 후
          </p>
        )}

        {/* AI 종합 분석 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                AI 종합 분석
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {analysis?.summary}
              </p>
            </div>
          </div>
        </div>

        {/* 추세 분석 그래프 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📊 추세 분석 (최근 12개월)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analysis?.trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${Number(value).toLocaleString()}만원`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                name="매출"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                name="지출"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                name="순이익"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">매출</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                +{analysis?.metrics.sales.value}% 📈
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">지출</p>
              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                +{analysis?.metrics.expense.value}% 🔺
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">순이익</p>
              <p className="text-lg font-bold text-gray-600 dark:text-gray-400">
                {analysis?.metrics.profit.value}% →
              </p>
            </div>
          </div>
        </div>

        {/* 원인 분석 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              원인 분석
            </h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {analysis?.insight.description}
          </p>

          <div className="mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              예상 원인:
            </h3>
            <ul className="space-y-2">
              {analysis?.insight.possibleCauses.map((cause: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span>•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              확인 필요 사항:
            </h3>
            <ul className="space-y-2">
              {analysis?.insight.actionItems.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnalysisPage;