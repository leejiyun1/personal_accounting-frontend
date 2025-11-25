import { useState } from 'react';
import { aiApi } from '../api';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export const useAiChat = (bookId: number | null) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '안녕하세요! AI 시드입니다. 무엇을 도와드릴까요?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!bookId || !message.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    setIsLoading(true);
    try {
      const response = await aiApi.chat({
        bookId,
        message: message,
      });

      // AI 응답 추가
      const aiMessage: Message = {
        role: 'ai',
        content: response.data.data.message
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('AI 채팅 실패:', error);
      const errorMessage: Message = {
        role: 'ai',
        content: '죄송합니다. 오류가 발생했습니다.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};