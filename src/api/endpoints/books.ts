import { apiClient } from '../client';
import {
  Book,
  BookDetailResponse,
  CreateBookRequest,
  UpdateBookRequest,
} from '../types/books';
import { ApiResponse } from '../types/common';

export const booksApi = {
  getBooks: () =>
    apiClient.get<ApiResponse<Book[]>>('/books'),

  getBook: (id: number) =>
    apiClient.get<ApiResponse<BookDetailResponse>>(`/books/${id}`),

  createBook: (data: CreateBookRequest) =>
    apiClient.post<ApiResponse<Book>>('/books', data),

  updateBook: (id: number, data: UpdateBookRequest) =>
    apiClient.put<ApiResponse<Book>>(`/books/${id}`, data),

  deleteBook: (id: number) =>
    apiClient.delete<ApiResponse<void>>(`/books/${id}`),
};
