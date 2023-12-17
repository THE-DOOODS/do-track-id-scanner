export const getCreds = () => {
  const { admin_id, first_name } = JSON.parse(
    localStorage.getItem('data') || '{}'
  );

  return { admin_id, first_name };
};
