export interface LedgerSummaryResponse {
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
}

export interface IncomeStatement {
  totalIncome: number;
  totalExpense: number;
  netIncome: number;
}

export interface BalanceSheet {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}

export interface AccountLedgerResponse {
  accountName: string;
  openingBalance: number;
  closingBalance: number;
  entries: LedgerEntry[];
}

export interface LedgerEntry {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}