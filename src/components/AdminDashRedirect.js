import { useEffect } from 'react';

//redirects to admin backend page on frontend /admin

const AdminDashRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://p465-backend-latest.onrender.com/admin/';
  }, []);
  return null;
};

export default AdminDashRedirect