import { apiClient } from '../client';
import { AiChatRequest, AiChatResponse } from '../types/ai';
import { ApiResponse } from '../types/common';

export const aiApi = {
  chat: (data: AiChatRequest) =>
    apiClient.post<ApiResponse<AiChatResponse>>('/ai/chat', data),
};
