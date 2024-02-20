import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from './components/signup/signup';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// auth context for user
export const AuthContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // memoize, prevent unnecessary rendering.
  const authContextValue = useMemo(() => ({
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false)
  }), [isAuthenticated]);

  // route protection
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      // redirect to login page if not logged in.
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin" element={<Navigate to="/admin" />} />
          {/* redirect to login if no other routes matched (can update to splash maybe?) */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
