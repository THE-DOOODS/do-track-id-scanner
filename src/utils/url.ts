export const url = (path: string) => {
  return process.env.DEV
    ? `http://localhost:3000/api${path}`
    : `http://do-track-backend.test/api${path}`;
};
