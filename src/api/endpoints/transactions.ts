import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import {
  CreateTransactionRequest,
  Transaction,
  TransactionDetailResponse,
  TransactionListParams,
  UpdateTransactionRequest,
} from '../types/transactions';

export const transactionsApi = {
  getTransactions: (params: TransactionListParams) =>
    apiClient.get<ApiResponse<Transaction[]>>('/transactions', {
      params,
    }),

  getTransaction: (id: number) =>
    apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`),

  getTransactionDetails: (id: number) =>
    apiClient.get<ApiResponse<TransactionDetailResponse>>(`/transactions/${id}/details`),

  createTransaction: (data: CreateTransactionRequest) =>
    apiClient.post<ApiResponse<Transaction>>('/transactions', data),

  updateTransaction: (id: number, data: UpdateTransactionRequest) =>
    apiClient.put<ApiResponse<Transaction>>(`/transactions/${id}`, data),

  deleteTransaction: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/transactions/${id}`),
};