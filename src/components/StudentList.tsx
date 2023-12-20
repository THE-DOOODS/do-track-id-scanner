/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';

const StudentList: React.FC<{ setStudents: any; originalStudents: any }> = ({
  setStudents,
  originalStudents
}) => {
  const [name, setName] = useState('');
  const [_, setFilteredStudents] = useState(originalStudents);

  const handleSearch = () => {
    const filteredList = originalStudents.filter((student: any) => {
      const fullName = student.first_name + ' ' + student.last_name;
      return fullName.toLowerCase().includes(name.toLowerCase());
    });

    setFilteredStudents(filteredList);
  };

  useEffect(() => {
    handleSearch();
  }, [name, originalStudents]);

  const resetSearch = () => {
    setName('');
    setFilteredStudents(originalStudents);
  };

  return (
    <div className="flex gap-4 items-center mt-4 w-full">
      <h1 className="font-bold text-2xl">Students</h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search"
          className="w-3/4 bg-transparent border border-zinc-700 rounded-full py-1 pl-2 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-primary rounded-full py-1 px-2 text-white font-bold"
        >
          <CiSearch className="font-bold" size={25} />
        </button>
        <button
          onClick={resetSearch}
          className="bg-gray-500 rounded-full py-1 px-2 text-white font-bold"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StudentList;
