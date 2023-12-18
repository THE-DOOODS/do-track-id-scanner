//eslint-disable-next-line
//@ts-nocheck
import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import toast, { Toaster } from 'react-hot-toast';
import { Input, Button } from '@mui/material';
import url from '@/utils/url';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

const Login: React.FC = () => {
  const { setToken } = useAuth();
  const [payload, setPayload] = useState({
    email: '',
    password: ''
  });

  const login = async () => {
    if (!payload.email || !payload.password) {
      toast.error('Please fill up all fields');
      return;
    }

    const { email, password } = payload;

    try {
      const res = await axios.post(
        url('/login'),
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data || res.status === 200) {
        setToken(res.data.data.token);

        const data = {
          admin_id: res?.data?.data?.admin?.admin_id,
          first_name: res?.data?.data?.admin?.first_name
        };

        localStorage.setItem('data', JSON.stringify(data));

        toast.success('Login successful!');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="font-main">
      <Toaster />
      <div className="bg-primary w-full h-3" />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex flex-col xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden justify-center items-center">
          <div className="">
            <img src={logo} alt="logo" className="w-28" />
            <h1 className="font-bold text-xl mt-4">Login</h1>
            <p className="text-sm text-zinc-500">
              Start managing attendees in the Do-Day event
            </p>
            <div className="mt-6">
              <label htmlFor="email" className="text-md font-semibold mt-6">
                Email
              </label>
              <Input
                id="email"
                type="email"
                className="w-full mt-2"
                autoFocus
                placeholder="Enter your email"
                value={payload.email}
                onChange={(e) =>
                  setPayload({ ...payload, email: e.target.value })
                }
              />
            </div>
            <div className="mt-6">
              <label htmlFor="email" className="text-md font-semibold mt-6">
                Password
              </label>
              <Input
                id="email"
                type="password"
                className="w-full mt-2"
                placeholder="Enter your password"
                value={payload.password}
                onChange={(e) =>
                  setPayload({ ...payload, password: e.target.value })
                }
              />
            </div>
            <Button
              onClick={login}
              style={{
                color: '#FFF',
                fontWeight: 'bold',
                marginTop: '25px'
              }}
              className="bg-gradient-to-r from-primary to-secondary w-full"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
