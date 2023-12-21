/* eslint-disable @typescript-eslint/no-explicit-any */
//eslint-disable-next-line
//@ts-nocheck
import React from 'react';

import Skeleton from '@mui/material/Skeleton';
import { FaCircleUser } from 'react-icons/fa6';
import { LiaEmpire } from 'react-icons/lia';

const List: React.FC<{
  students: any;
  loading: boolean;
  setStudent: any;
}> = ({ students, loading }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      {students?.length !== 0 ? (
        students?.map((student, idx) =>
          loading ? (
            <Skeleton
              key={idx}
              variant="rectangular"
              width={'100%'}
              height={40}
            />
          ) : (
            <div
              key={idx}
              className="bg-transparent w-full rounded-md p-2 border-t border-zinc-400"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <FaCircleUser className="text-primary" size={25} />
                    <div className="flex flex-col">
                      <h1 className="font-semibold">
                        {student?.first_name + ' ' + student?.last_name}
                      </h1>
                      <p className="text-xs">{student?.program_name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <LiaEmpire
                      size={15}
                      className={`${
                        student?.year_level_code === '1st'
                          ? 'text-green-600'
                          : student?.year_level_code === '2nd'
                          ? 'text-blue-600'
                          : student?.year_level_code === '3rd'
                          ? 'text-red-600'
                          : student?.year_level_code === '4th'
                          ? 'text-yellow-500'
                          : 'text-purple-500'
                      }`}
                    />
                    <p
                      className={`${
                        student?.year_level_code === '1st'
                          ? 'text-green-600'
                          : student?.year_level_code === '2nd'
                          ? 'text-blue-600'
                          : student?.year_level_code === '3rd'
                          ? 'text-red-600'
                          : student?.year_level_code === '4th'
                          ? 'text-yellow-500'
                          : 'text-purple-500'
                      }`}
                    >
                      {student?.year_level_code}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center ml-10">
                  <p className="bg-zinc-400 p-2 rounded-md text-xs ">
                    Time In:{' '}
                    <span className="font-semibold">
                      {student?.time_in
                        ? new Date(student?.time_in).toLocaleTimeString(
                            'en-US',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            }
                          )
                        : 'No in yet.'}
                    </span>
                  </p>
                  <p className="bg-zinc-400 p-2 rounded-md text-xs ">
                    Time Out:{' '}
                    <span className="font-semibold">
                      {student?.time_out
                        ? new Date(student?.time_out).toLocaleTimeString(
                            'en-US',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            }
                          )
                        : 'No out yet'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="h-screen grid place-content-center place-items-center justify-center">
          <h1 className="font-bold text-3xl text-center">
            No students yet being scanned
          </h1>
        </div>
      )}
    </div>
  );
};

export default List;
