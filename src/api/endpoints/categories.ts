import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import { Category, PaymentMethod, BookType } from '../types/categories';

export const categoriesApi = {
  getIncomeCategories: (bookType: BookType) =>
    apiClient.get<ApiResponse<Category[]>>('/categories/income', {
      params: { bookType },
    }),

  getExpenseCategories: (bookType: BookType) =>
    apiClient.get<ApiResponse<Category[]>>('/categories/expense', {
      params: { bookType },
    }),

  getPaymentMethods: (bookType: BookType) =>
    apiClient.get<ApiResponse<PaymentMethod[]>>('/categories/payment-methods', {
      params: { bookType },
    }),

  getAllAccounts: (bookType: BookType) =>
    apiClient.get<ApiResponse<Category[]>>('/accounts', {
      params: { bookType },
    }),

  getAccount: (id: number) =>
    apiClient.get<ApiResponse<Category>>(`/accounts/${id}`),
};
