import React, { useEffect } from 'react';
// import { getCreds } from '@/utils/getCreds';
import url from '@/utils/url';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

const Pagination: React.FC = () => {
  // const { admin_id } = getCreds();

  const getData = async () => {
    try {
      const res = await axios.get(url('/attendance/attendance-by-college/1'), {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {[
              'Student ID',
              'First Name',
              'Last Name',
              'Program',
              'Year',
              'Time In',
              'Time Out'
            ].map((head, idx) => {
              return (
                <TableCell key={idx}>
                  <h1>{head}</h1>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <h1>Hello</h1>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Pagination;
