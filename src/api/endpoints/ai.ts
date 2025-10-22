import { apiClient } from '../client';
import { ApiResponse } from '../types/common';
import { AiChatRequest, AiChatResponse } from '../types/ai';

export const aiApi = {
  chat: (data: AiChatRequest) =>
    apiClient.post<ApiResponse<AiChatResponse>>('/ai/chat', data),
};
