import { useEffect, useState } from 'react';
import { booksApi, statisticsApi } from '../api';
import { useBookStore } from '../store/bookStore';

export const useBooks = () => {
  const { books, selectedBookId, setSelectedBookId, setBooks } = useBookStore();
  const [accountBalances, setAccountBalances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 장부 목록 조회
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await booksApi.getBooks();
      const bookList = response.data.data || [];
      setBooks(bookList);

      // 첫 번째 장부 자동 선택
      if (bookList.length > 0 && !selectedBookId) {
        setSelectedBookId(bookList[0].id);
      }
    } catch (error) {
      console.error('장부 목록 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 계정 잔액 조회
  const fetchAccountBalances = async (bookId: number) => {
    try {
      const response = await statisticsApi.getAccountBalances({ bookId });
      setAccountBalances(response.data.data || []);
    } catch (error) {
      console.error('계정 잔액 조회 실패:', error);
    }
  };

  // 장부 삭제
  const deleteBook = async (bookId: number) => {
    if (!confirm('정말 이 장부를 삭제하시겠습니까?\n모든 거래 내역이 삭제됩니다.')) {
      return;
    }

    try {
      await booksApi.deleteBook(bookId);
      await fetchBooks(); // 목록 새로고침
      alert('장부가 삭제되었습니다.');
    } catch (error) {
      console.error('장부 삭제 실패:', error);
      alert('장부 삭제에 실패했습니다.');
    }
  };

  // selectedBookId 변경 시 계정 잔액 조회
  useEffect(() => {
    if (selectedBookId) {
      fetchAccountBalances(selectedBookId);
    }
  }, [selectedBookId]);

  return {
    books,
    selectedBookId,
    setSelectedBookId,
    accountBalances,
    isLoading,
    fetchBooks,
    deleteBook,
  };
};