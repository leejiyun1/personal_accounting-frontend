export interface MonthlySummary {
  yearMonth: string;
  income: number;
  expense: number;
  balance: number;
}

export type MonthlySummaryResponse = MonthlySummary;

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

export interface CategoryStatisticsParams {
  yearMonth: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface AccountBalance {
  accountId: number;
  accountName: string;
  balance: number;
}

export type AccountBalanceResponse = AccountBalance;