export {};

declare global {
  interface StudentAttendance {
    studentId: string;
    firstName: string;
    lastName: string;
    program: string;
    year: string;
    timeIn: string;
    timeOut: string;
    designator: string;
  }
}
