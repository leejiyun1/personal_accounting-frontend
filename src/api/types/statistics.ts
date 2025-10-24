export interface MonthlySummary {
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export type SummaryResponse = MonthlySummary[];
export interface CategoryStatistic {
  categoryId: number;
  categoryName: string;
  amount: number;
  percentage: number;
}

export interface CategoryStatisticsResponse {
  yearMonth: string;
  type: 'INCOME' | 'EXPENSE';
  totalAmount: number;
  categories: CategoryStatistic[];
}

export interface SummaryParams {
  bookId: number;
}

export interface CategoryStatisticsParams {
  bookId: number;
  yearMonth: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface AccountBalance {
  accountId: number;
  accountName: string;
  balance: number;
}

export interface AccountBalanceParams {
  bookId: number;
}

export type AccountBalanceResponse = AccountBalance;

/**
 * 차트 데이터 타입
 */
export interface ChartDataItem {
  month: string;
  monthName: string;
  income: number;
  expense: number;
}

export interface PieChartDataItem {
  name: string;
  value: number;
  percent: number;
}