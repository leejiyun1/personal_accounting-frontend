export interface MonthlySummary {
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface SummaryResponse {
  months: MonthlySummary[];
}

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