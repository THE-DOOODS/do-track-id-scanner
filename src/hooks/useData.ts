import { Admin } from '@/types/global';

export const useData = () => {
  const getData = () => {
    const data = sessionStorage.getItem('admin');

    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  const setData = (data: Admin) => {
    sessionStorage.setItem('admin', JSON.stringify(data));
  };

  const emptyData = () => {
    sessionStorage.removeItem('data');
  };

  return { getData, setData, emptyData };
};
