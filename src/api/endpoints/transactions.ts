import { apiClient } from '../client';
import { ApiResponse, PaginationResponse } from '../types/common';
import {
  CreateTransactionRequest,
  Transaction,
  TransactionListParams,
  UpdateTransactionRequest,
} from '../types/transactions';

export const transactionsApi = {
  getTransactions: (params: TransactionListParams) =>
    apiClient.get<ApiResponse<PaginationResponse<Transaction>>>('/transactions', {
      params,
    }),

  getTransaction: (id: number) =>
    apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`),

  createTransaction: (data: CreateTransactionRequest) =>
    apiClient.post<ApiResponse<Transaction>>('/transactions', data),

  updateTransaction: (id: number, data: UpdateTransactionRequest) =>
    apiClient.put<ApiResponse<Transaction>>(`/transactions/${id}`, data),

  deleteTransaction: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/transactions/${id}`),
};
