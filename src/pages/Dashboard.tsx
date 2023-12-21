//eslint-disable-next-line
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import logo from '@/assets/logo.png';
import { HiMiniUser } from 'react-icons/hi2';
import NavBar from '@/components/NavBar';
import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { getCreds } from '@/utils/getCreds';
import StudentList from '@/components/StudentList';
import illustration from '@/assets/illustration.png';
import List from '@/components/List';
import { toast, Toaster } from 'sonner';
import url from '@/utils/url';
import { useAuth } from '@/hooks/useAuth';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { getToken, removeToken } = useAuth();
  const { first_name } = getCreds();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { admin_id } = getCreds();

  const logout = async () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const res = await axios.delete(url('/logout'), {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data || res.status === 200) {
        toast.promise(promise, {
          loading: 'Logging out',
          success: () => {
            return `Logged out successfully!`;
          },
          error: 'Error'
        });
      }

      setTimeout(() => {
        removeToken();
        localStorage.clear();
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        url(`/attendance/get-scanned-by-admin/${admin_id}`),
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      const { data } = res.data;

      setStudents(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="font-main bg-zinc-100">
      <Toaster richColors />
      <div className="xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
        <div className="flex flex-col min-h-full">
          <div className="flex justify-between items-center mt-4">
            <img src={logo} alt="logo" className="w-28" />
            <Popover placement="bottom">
              <PopoverTrigger>
                <HiMiniUser
                  className="bg-primary p-1 rounded-full text-white"
                  size={25}
                />
              </PopoverTrigger>
              <PopoverContent>
                <button
                  onClick={logout}
                  className="absolute left-[290px] top-[45px] bg-primary p-2 rounded-md text-white font-bold shadow-zinc-950 shadow-2xl focus:outline outline-none"
                >
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
          <StudentList students={students} />
        </div>
      </div>
      <div className="rounded-t-[40px] bg-zinc-300 h-full mt-4 pt-6 pb-24">
        <div className="xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
          <List
            students={students}
            setStudents={setStudents}
            loading={loading}
          />
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default Dashboard;
