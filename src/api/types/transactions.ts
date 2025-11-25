export interface Transaction {
  id: number;
  bookId: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  categoryId: number;
  categoryName: string;
  paymentMethodId: number;
  paymentMethodName: string;
  memo?: string;
  createdAt: string;
}

export interface TransactionDetailResponse {
  id: number;
  bookId: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  categoryId: number;
  categoryName: string;
  paymentMethodId: number;
  paymentMethodName: string;
  memo?: string;
  createdAt: string;
  journalEntries: JournalEntry[];
}

export interface JournalEntry {
  id: number;
  debit: number;
  credit: number;
  details: TransactionDetail[];
}

export interface TransactionDetail {
  accountId: number;
  accountName: string;
  amount: number;
}

export interface CreateTransactionRequest {
  bookId: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  categoryId: number;
  paymentMethodId: number;
  memo?: string;
}

export interface UpdateTransactionRequest {
  date?: string;
  amount?: number;
  categoryId?: number;
  paymentMethodId?: number;
  memo?: string;
}

export interface TransactionListParams {
  bookId: number;
  type?: 'INCOME' | 'EXPENSE';
  startDate?: string;
  endDate?: string;
}