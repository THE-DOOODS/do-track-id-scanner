export const url = (path: string) => {
  return process.env.DEV
    ? `http://localhost:3000${path}`
    : `https://nextjs-auth0.vercel.app${path}`;
};
