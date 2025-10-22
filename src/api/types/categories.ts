export interface Category {
  id: number;
  code: string;
  name: string;
  type: 'INCOME' | 'EXPENSE' | 'ASSET' | 'LIABILITY' | 'EQUITY';
}

export interface PaymentMethod {
  id: number;
  code: string;
  name: string;
}

export type BookType = 'PERSONAL' | 'BUSINESS';
