import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { authApi } from '../api';
import { clearTokens, setAccessToken, setRefreshToken, setUser } from '../utils/storage';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authApi.login({ email, password });
      const { accessToken, refreshToken, user } = response.data.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);

      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      console.error('로그인 실패:', err);
      setError(axiosError.response?.data?.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('로그아웃 API 실패:', err);
    }
    clearTokens();
    navigate('/');
  };

  return {
    login,
    logout,
    isLoading,
    error,
  };
};
