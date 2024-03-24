import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PasswordResetForm from './components/password_reset/PasswordResetForm';
import SignupForm from './components/signup/signup';
import VenueSignup from './components/venue_signup/venue_signup';
import VenueLogin from './components/venue_login/venue_login';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/dashboard';
import VenueDashboard from './components/venue_dashboard/venue_dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashRedirect from './components/admindashredirect/AdminDashRedirect';
import LandingPage from "./components/landingpage/landingpage";


// auth context for user
export const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null, // get user email, other details
  login: () => {},
  logout: () => {}
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Retrieve user data from localStorage

  useEffect(() => {
    // check for auth state and user data in localStorage
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);
    }
    
    if (userData) {
      setUser(JSON.parse(userData)); // Assume userData is stored as a JSON string
    }
  }, []);
  

  const login = (userData) => { // `userData` should contain email and any other user info
    setIsAuthenticated(true);
    console.log(userData);
    setUser(userData); // Set user data in state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Clear user data from state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  // Include `user` in the context value
  const authContextValue = useMemo(() => ({
    isAuthenticated,
    user, // Provide user data through context
    login,
    logout
  }), [isAuthenticated, user]);

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
          <Route path="/vlogin" element={<VenueLogin />}/>
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
          <Route 
            path="/vdashboard" 
            element={
              <ProtectedRoute>
                <VenueDashboard />
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
