export interface AiChatRequest {
  bookId: number;
  conversationId?: string;
  message: string;
}

export interface AiChatResponse {
  success: boolean;
  needsMoreInfo: boolean;
  conversationId?: string;
  message: string;
  question?: string;
  suggestions?: string[];
  transaction?: {
    id: number;
    date: string;
    type: 'INCOME' | 'EXPENSE';
    amount: number;
    categoryName: string;
    paymentMethodName: string;
    memo?: string;
  };
}
