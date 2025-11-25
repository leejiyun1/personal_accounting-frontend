import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import { AccountLedgerResponse, FinancialStatementResponse } from '../types/ledger';

export const ledgerApi = {
  // 재무제표 조회 (손익계산서 + 재무상태표)
  getFinancialStatement: (bookId: number, yearMonth: string) =>
    apiClient.get<ApiResponse<FinancialStatementResponse>>(`/ledger/statement/${bookId}`, {
      params: { yearMonth }
    }),

  // 계정별 원장 조회
  getAccountLedger: (bookId: number, accountId: number, yearMonth: string) =>
    apiClient.get<ApiResponse<AccountLedgerResponse>>(`/ledger/account/${bookId}/${accountId}`, {
      params: { yearMonth }
    }),
};