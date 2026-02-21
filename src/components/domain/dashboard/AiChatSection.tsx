interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface AiChatSectionProps {
  messages: Message[];
  message: string;
  aiLoading: boolean;
  onChangeMessage: (value: string) => void;
  onSend: () => void;
}

function AiChatSection({
  messages,
  message,
  aiLoading,
  onChangeMessage,
  onSend,
}: AiChatSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        AI 시드
      </h2>

      <div className="space-y-4 mb-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => onChangeMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="메시지를 입력하세요..."
          disabled={aiLoading}
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          onClick={onSend}
          disabled={aiLoading}
          className="px-6 py-2.5 text-white bg-primary-600 hover:bg-primary-700 rounded-lg font-medium disabled:opacity-50"
        >
          {aiLoading ? '전송 중...' : '전송'}
        </button>
      </div>
    </div>
  );
}

export default AiChatSection;
