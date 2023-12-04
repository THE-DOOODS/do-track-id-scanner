/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { StudentAttendance } from '@/types/global';

type Args = {
  url: string;
  token: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useFetch = ({ ...args }: Args) => {
  const [data, setData] = useState<StudentAttendance[]>([]);

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${args.token}`
  } as HeadersInit);

  useEffect(() => {
    const fetchData = async () => {
      args.setLoading(true);
      const response = await fetch(args.url, {
        headers
      });
      const data = await response.json();
      setData(data);
      if (response.ok || response.status === 200) {
        setTimeout(() => {
          args.setLoading(false);
        }, 1500);
      }
    };
    fetchData();
  }, [args.url, args.token]);

  return { data };
};
