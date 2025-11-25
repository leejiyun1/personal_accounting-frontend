import { apiClient } from '../client';
import { AccountResponse, BookType, CategoryResponse } from '../types/categories';
import { ApiResponse } from '../types/common';

export const categoriesApi = {
  getIncomeCategories: (bookType: BookType) =>
    apiClient.get<ApiResponse<CategoryResponse[]>>('/categories/income', {
      params: { bookType },
    }),

  getExpenseCategories: (bookType: BookType) =>
    apiClient.get<ApiResponse<CategoryResponse[]>>('/categories/expense', {
      params: { bookType },
    }),

  getPaymentMethods: (bookType: BookType) =>
    apiClient.get<ApiResponse<CategoryResponse[]>>('/categories/payment-methods', {
      params: { bookType },
    }),

  getAllAccounts: (bookType: BookType) =>
    apiClient.get<ApiResponse<AccountResponse[]>>('/accounts', {
      params: { bookType },
    }),

  getAccount: (id: number) =>
    apiClient.get<ApiResponse<AccountResponse>>(`/accounts/${id}`),
};