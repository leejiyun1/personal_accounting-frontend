export interface AnalysisResponse {
  summary: AnalysisSummary;
  aiAnalysis: AiAnalysisComment;
  categoryExpenses: CategoryExpense[];
}

export interface AnalysisSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  profitRate: number;
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