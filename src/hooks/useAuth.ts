import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const [cookie, setCookie] = useCookies(['token']);

  const getToken = () => {
    return cookie.token;
  };

  const setToken = (token: string) => {
    setCookie('token', token, { path: '/' });
  };

  const removeToken = () => {
    setCookie('token', '', { path: '/' });
  };
  return { getToken, setToken, removeToken };
};
