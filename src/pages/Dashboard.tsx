//eslint-disable-next-line
//@ts-nocheck
import React from 'react';
import logo from '@/assets/logo.png';
import { HiMiniUser } from 'react-icons/hi2';
import NavBar from '@/components/NavBar';
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { getCreds } from '@/utils/getCreds';
import StudentList from '@/components/StudentList';
import illustration from '@/assets/illustration.png';
import List from '@/components/List';

const Dashboard: React.FC = () => {
  const { first_name } = getCreds();
  return (
    <div className="font-main bg-zinc-100">
      <div className="xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
        <div className="flex flex-col min-h-full">
          <div className="flex justify-between items-center mt-4">
            <img src={logo} alt="logo" className="w-28" />
            <Popover open={open}>
              <PopoverTrigger>
                <HiMiniUser
                  className="relative bg-primary p-1 rounded-full text-white"
                  size={25}
                />
              </PopoverTrigger>
              <PopoverContent>
                <button className="absolute bg-zinc-400 p-2 rounded-md text-zinc-800">
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4 bg-primary p-4 rounded-2xl text-white grid grid-cols-6 gap-4 justify-items-center">
            <div className="col-span-4">
              <h1 className="font-bold text-2xl leading-6">
                Hello, <span className="text-secondary">{first_name}</span>
              </h1>
              <p className="text-sm text-zinc-200 leading-tight mt-2">
                Below are the list of students designated to you.
              </p>
            </div>
            <div className="col-span-2">
              <img src={illustration} className="w-full h-28" />
            </div>
          </div>
          <StudentList />
        </div>
      </div>
      <div className="rounded-t-[40px] bg-zinc-300 h-full mt-4 pt-6 pb-24">
        <div className="xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
          <List />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Dashboard;
