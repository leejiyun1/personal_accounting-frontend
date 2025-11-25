import { apiClient } from '../client';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth';
import { ApiResponse } from '../types/common';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data),

  logout: () =>
    apiClient.post<ApiResponse<void>>('/auth/logout'),

  refresh: (data: RefreshTokenRequest) =>
    apiClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', data),
};