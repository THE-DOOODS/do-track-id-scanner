import React from 'react';
import { CiSearch } from 'react-icons/ci';

const StudentList: React.FC = () => {
  return (
    <div className="flex gap-4 items-center mt-4 w-full">
      <h1 className="font-bold text-2xl">Students</h1>
      <div className="flex gap-2 items-center">
        <input
          type="/text"
          placeholder="Search"
          className="w-3/4 bg-transparent border border-zinc-700 rounded-full py-1 pl-2 text-sm"
        />
        <button className="bg-primary rounded-full py-1 px-2 text-white font-bold">
          <CiSearch className="font-bold" size={25} />
        </button>
      </div>
    </div>
  );
};

export default StudentList;
