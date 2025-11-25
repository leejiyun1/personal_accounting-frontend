export interface CategoryResponse {
  id: number;
  code: string;
  name: string;
  accountType: 'PAYMENT_METHOD' | 'REVENUE' | 'EXPENSE';
}

export interface AccountResponse {
  id: number;
  code: string;
  name: string;
  accountType: 'PAYMENT_METHOD' | 'REVENUE' | 'EXPENSE';
  bookType: 'PERSONAL' | 'BUSINESS';
}

export type BookType = 'PERSONAL' | 'BUSINESS';