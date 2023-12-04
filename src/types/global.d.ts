export type Admin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  college_id: string;
};

export type StudentAttendance = {
  studentId: string;
  firstName: string;
  lastName: string;
  program: string;
  year: string;
  timeIn: string;
  timeOut: string;
  designator: string;
};
