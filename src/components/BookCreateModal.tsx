import { useState } from 'react';
import { booksApi } from '../api';

interface BookCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function BookCreateModal({ isOpen, onClose, onSuccess }: BookCreateModalProps) {
  const [bookType, setBookType] = useState<'personal' | 'business'>('personal');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await booksApi.createBook({ bookType, name: name.trim() });
      onSuccess();
      onClose();
      setName('');
      setBookType('personal');
    } catch (error) {
      console.error('장부 생성 실패:', error);
      alert('장부 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          새 장부 만들기
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 장부 타입 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              장부 타입
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBookType('personal')}
                className={`p-4 rounded-lg border-2 transition ${
                  bookType === 'personal'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <span className="text-2xl mb-2 block">📕</span>
                <span className="font-medium text-gray-900 dark:text-white">개인</span>
              </button>
              <button
                type="button"
                onClick={() => setBookType('business')}
                className={`p-4 rounded-lg border-2 transition ${
                  bookType === 'business'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <span className="text-2xl mb-2 block">💼</span>
                <span className="font-medium text-gray-900 dark:text-white">사업</span>
              </button>
            </div>
          </div>

          {/* 장부 이름 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              장부 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 내 가계부"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? '생성 중...' : '생성하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookCreateModal;
