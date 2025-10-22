export interface Book {
  id: number;
  name: string;
  bookType: 'PERSONAL' | 'BUSINESS';
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  bookType: 'PERSONAL' | 'BUSINESS';
  name: string;
}

export interface UpdateBookRequest {
  name: string;
}

export interface BookDetailResponse extends Book {
  accounts: AccountBalance[];
}

export interface AccountBalance {
  accountId: number;
  accountCode: string;
  accountName: string;
  balance: number;
}
