export interface AnalysisResponse {
  summary: AnalysisSummary;
  aiComment: AiAnalysisComment;
  topExpenses: CategoryExpense[];
}

export interface AnalysisSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitRate: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}
export interface AiAnalysisComment {
  overview: string;
  strengths: string[];
  warnings: string[];
  suggestions: string[];
}

export interface CategoryExpense {
  categoryName: string;
  amount: number;
  percentage: number;
}