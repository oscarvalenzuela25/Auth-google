import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/auth/auth.store';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { googleLogin, googleRefreshToken } from '../services/googleAuth';

type Props = {
  redirectAfterLogin?: string;
};

const useGoogleAuth = ({ redirectAfterLogin }: Props = {}) => {
  const { push } = useHistory();
  const user = useAuthStore(state => state.user);
  const tokenData = useAuthStore(state => state.tokenData);
  const setUser = useAuthStore(state => state.setUser);
  const setTokenData = useAuthStore(state => state.setTokenData);
  const handleLogout = useAuthStore(state => state.logout);

  const setAxiosAuthToken = (token: string) => {
    let {
      defaults: {
        headers: { common = {} },
      },
    } = axios;
    common = {
      ...common,
      Authorization: `Bearer ${token}`,
    };
    axios.defaults.headers.common = common;
  };

  const deleteAuthToken = () => {
    delete axios.defaults.headers.common.Authorization;
  };

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async responseToken => {
      try {
        const data = await googleLogin(responseToken.code);
        setAxiosAuthToken(data.access_token);
        setUser({
          email: data.email,
          name: data.name,
          picture: data.picture,
        });
        setTokenData({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expiry_date: data.expiry_date,
        });
        if (redirectAfterLogin) {
          push(redirectAfterLogin, { replace: true });
        }
      } catch (error) {
        console.log('Error de auth/google:', error);
      }
    },
  });

  const logout = () => {
    handleLogout();
    deleteAuthToken();
    push('/login', { replace: true });
    googleLogout();
  };

  const verifyAccessToken = async () => {
    if (user && tokenData) {
      const currentDate = moment();
      const expiryDate = moment(tokenData?.expiry_date || 0);
      const isValidToken = currentDate.isBefore(expiryDate);
      if (isValidToken) {
        setAxiosAuthToken(tokenData.access_token);
        return true;
      }
      try {
        const data = await googleRefreshToken(tokenData.refresh_token);
        setAxiosAuthToken(data.access_token);
        setTokenData({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          expiry_date: data.expiry_date,
        });
        return true;
      } catch (error) {
        console.log('Error de validacion de token:', error);
        return false;
      }
    } else {
      return false;
    }
  };

  return {
    user,
    tokenData,
    setUser,
    setTokenData,
    login,
    logout,
    verifyAccessToken,
    push,
  };
};

export default useGoogleAuth;
