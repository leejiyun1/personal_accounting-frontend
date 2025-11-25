import { FinancialStatement } from './ledger';

export interface AnalysisResponse {
  summary: FinancialStatement;
  aiComment: AiAnalysisComment;
  topExpenses: CategoryExpense[];
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