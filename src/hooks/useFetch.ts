/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { StudentAttendance } from '@/types/global';

export const useFetch = (url: string, token: string) => {
  const [data, setData] = useState<StudentAttendance[]>([]);

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  } as HeadersInit);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        headers
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [url]);

  return { data };
};
