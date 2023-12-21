/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const StudentList: React.FC<{ students: any }> = ({ students }) => {
  return (
    <div className="flex justify-between items-center mt-4 w-full">
      <h1 className="font-bold text-2xl">Student List</h1>
      <p className="text-sm">{students?.length} Students attended</p>
    </div>
  );
};

export default StudentList;
