import { apiClient } from '../client';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignupRequest,
  SocialLoginRequest,
} from '../types/auth';
import { ApiResponse } from '../types/common';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data),

  signup: (data: SignupRequest) =>
    apiClient.post<ApiResponse<void>>('/auth/signup', data),

  logout: () =>
    apiClient.post<ApiResponse<void>>('/auth/logout'),

  refresh: (data: RefreshTokenRequest) =>
    apiClient.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', data),

  socialLogin: (provider: 'google' | 'kakao', data: SocialLoginRequest) =>
    apiClient.post<ApiResponse<LoginResponse>>(`/auth/social/${provider}`, data),
};
