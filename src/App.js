import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PasswordResetForm from './components/password_reset/PasswordResetForm';
import SignupForm from './components/signup/signup';
import VenueSignup from './components/venue_signup/venue_signup';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashRedirect from './components/admindashredirect/AdminDashRedirect';
import LandingPage from "./components/landingpage/landingpage";


// auth context for user
export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

function App() {
  // init isAuthenticated check from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    // check for auth state in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // memoize, prevent unnecessary rendering.
  const authContextValue = useMemo(() => ({
    isAuthenticated,
    login: () => {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // save state to localStorage
    },
    logout: () => {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated'); // clear state from localStorage
    }
  }), [isAuthenticated]);

  // route protection
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      // redirect to login page if not logged in.
      return <Navigate to="/login" />;
    }

    return children;
  };

  // adding paths
  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/vsignup" element={<VenueSignup />}/>
          <Route path="/admin-dash" element={<AdminDashRedirect />} />
          <Route path="/password-reset" element={<PasswordResetForm />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin" element={<AdminDashRedirect />} />
          {/* redirect to login if no other routes matched (can update to splash maybe?) */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
