import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    } catch (err: any) {
      console.error('로그인 실패:', err);
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
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