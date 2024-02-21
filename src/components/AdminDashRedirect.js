import { useEffect } from 'react';

//redirects to admin backend page on frontend /admin

const AdminDashRedirect = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8000/admin/';
  }, []);
  return null;
};

export default AdminDashRedirect