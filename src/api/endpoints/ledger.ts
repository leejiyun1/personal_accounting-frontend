import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import { AccountLedgerResponse, LedgerSummaryResponse } from '../types/ledger';

export const ledgerApi = {
  getLedgerSummary: (bookId: number, yearMonth: string) =>
    apiClient.get<ApiResponse<LedgerSummaryResponse>>('/ledger/summary', {
      params: { bookId, yearMonth }
    }),

  getAccountLedger: (bookId: number, accountId: number, yearMonth: string) =>
    apiClient.get<ApiResponse<AccountLedgerResponse>>('/ledger/accounts', {
      params: { bookId, accountId, yearMonth }
    }),
};