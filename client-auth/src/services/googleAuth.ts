import axios from 'axios';
import { AuthResponse, RefreshTokenResponse } from '../types/auth.types';

export const googleLogin = async (code: string): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>(
    'http://localhost:3000/auth/google',
    {
      code,
    }
  );
  return data;
};

export const googleRefreshToken = async (
  refresh_token: string
): Promise<RefreshTokenResponse> => {
  const { data } = await axios.post<RefreshTokenResponse>(
    'http://localhost:3000/auth/google/refresh-token',
    {
      refresh_token,
    }
  );

  return data;
};
