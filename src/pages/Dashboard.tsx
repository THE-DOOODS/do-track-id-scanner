//eslint-disable-next-line
//@ts-nocheck
import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import { HiMiniUser } from 'react-icons/hi2';
import { useData } from '@/hooks/useData';
import NavBar from '@/components/NavBar';
import { Pagination } from '@mui/material';
import { useFetch } from '@/hooks/useFetch';
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  const { getData } = useData();
  const [admin, setAdmin] = useState({});
  const { data } = useFetch('/admin');

  return (
    <div className="font-main">
      <div className="bg-primary w-full h-3" />
      <div className="xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
        <div className="flex flex-col min-h-full">
          <div className="flex justify-between items-center mt-4">
            <img src={logo} alt="logo" className="w-28" />
            <Popover open={open}>
              <PopoverTrigger>
                <HiMiniUser
                  className="bg-primary p-1 rounded-full text-white"
                  size={25}
                />
              </PopoverTrigger>
              <PopoverContent>
                <button className="">Logout</button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-2xl">Hello</h1>
            <p className="text-sm text-zinc-600 leading-tight">
              Below are the list of students designated to you. Please keep on
              monitoring them.
            </p>
          </div>
          <Pagination />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Dashboard;
