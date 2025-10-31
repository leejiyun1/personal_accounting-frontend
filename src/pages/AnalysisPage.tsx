import { useEffect, useState } from 'react';
import { analysisApi, AnalysisResponse } from '../api';
import { useBookStore } from '../store/bookStore';

function AnalysisPage() {
  const { selectedBookId } = useBookStore();

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  // 갱신 가능 여부 (1시간)
  const canRefresh = timeUntilRefresh <= 0;

  // 분석 데이터 가져오기
  useEffect(() => {
    if (!selectedBookId) return;
    fetchAnalysis();
  }, [selectedBookId, selectedMonth]);

  const fetchAnalysis = async () => {
    if (!selectedBookId) return;

    setIsLoading(true);
    try {
      const response = await analysisApi.getAnalysis(selectedBookId, selectedMonth);
      setAnalysis(response.data.data);
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

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">장부를 선택해주세요.</div>
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
          <div className="flex gap-3 items-center">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="2025-10">2025년 10월</option>
              <option value="2025-09">2025년 9월</option>
              <option value="2025-08">2025년 8월</option>
            </select>
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
        </div>

        {!canRefresh && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
            갱신 가능: {timeUntilRefresh}분 후
          </p>
        )}

        {/* 재무 요약 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📊 재무 요약
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 수입</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analysis.summary.totalIncome.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 지출</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.summary.totalExpense.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">순이익</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analysis.summary.netProfit.toLocaleString()}원
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                수익률: {analysis.summary.profitRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* AI 종합 분석 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                AI 종합 분석
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {analysis.aiAnalysis.overview}
              </p>
            </div>
          </div>
        </div>

        {/* 카테고리별 지출 */}
        {analysis.categoryExpenses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              💰 카테고리별 지출 TOP 5
            </h2>
            <div className="space-y-3">
              {analysis.categoryExpenses.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{category.categoryName}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {category.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 font-mono text-gray-900 dark:text-white">
                    {category.amount.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 잘한 점 */}
        {analysis.aiAnalysis.strengths.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                잘한 점
              </h2>
            </div>
            <ul className="space-y-2">
              {analysis.aiAnalysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span>•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 경고 사항 */}
        {analysis.aiAnalysis.warnings.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                경고 사항
              </h2>
            </div>
            <ul className="space-y-2">
              {analysis.aiAnalysis.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span>•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 개선 제안 */}
        {analysis.aiAnalysis.suggestions.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                개선 제안
              </h2>
            </div>
            <ul className="space-y-2">
              {analysis.aiAnalysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span>•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default AnalysisPage;