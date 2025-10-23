import { create } from 'zustand';

interface Book {
  id: number;
  name: string;
  bookType: 'PERSONAL' | 'BUSINESS';
}

interface BookStore {
  books: Book[];
  selectedBookId: number | null;
  setBooks: (books: Book[]) => void;
  setSelectedBookId: (id: number) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  selectedBookId: null,
  setBooks: (books) => set({ books }),
  setSelectedBookId: (id) => set({ selectedBookId: id }),
}));