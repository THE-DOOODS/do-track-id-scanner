import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import { Input } from '@mui/material';

const Login: React.FC = () => {
  const [payload, setPayload] = useState({
    username: '',
    password: ''
  });

  return (
    <div className="font-main h-screen">
      <div className="bg-primary w-full h-3" />
      <div className="flex flex-col xxxs:px-4 xxs:px-6 xs:px-8 sm:px-10 md:hidden">
        <div className="">
          <img src={logo} alt="logo" className="w-24" />
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
              value={payload.username}
              onChange={(e) =>
                setPayload({ ...payload, username: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
