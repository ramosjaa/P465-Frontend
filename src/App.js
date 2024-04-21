import React, { useState, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import LandingPage from './components/landingpage/landingpage';
import Footer from './components/Footer/Footer.jsx';
import CustomNavbar from './components/navbar/CustomNavbar.jsx';
import PaymentForm from './components/payment_form/PaymentForm.jsx';
import PaymentSuccess from "./components/payment_form/PaymentSuccess";

// auth context for user
export const AuthContext = React.createContext({
    isAuthenticated: false,
    user: null, // get user email, other details
    login: () => { },
    logout: () => { },
});

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem('isAuthenticated') === 'true'
    );

    const [user, setUser] = useState(() => {
        const userData = sessionStorage.getItem('user');
        return userData ? JSON.parse(userData) : null; // Only parse if userData is not null/undefined
    });

    useEffect(() => {
        // check for auth state and user data in sessionStorage
        const token = sessionStorage.getItem('authToken');
        const userData = sessionStorage.getItem('user');

        if (token) {
            setIsAuthenticated(true);
        }

        if (userData) {
            setUser(JSON.parse(userData)); // Assume userData is stored as a JSON string
        }
    }, []);

    const login = (userData) => {
        // `userData` should contain email and any other user info
        setIsAuthenticated(true);
        console.log(userData);
        setUser(userData); // Set user data in state
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData)); // Store user data in sessionStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Clear user data from state
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user'); // Clear user data from sessionStorage
    };

    // Include `user` in the context value
    const authContextValue = useMemo(
        () => ({
            isAuthenticated,
            user, // Provide user data through context
            login,
            logout,
        }),
        [isAuthenticated, user]
    );

    // route protection
    const UProtectedRoute = ({ children }) => {
        const type = user?.type;
        if (!isAuthenticated || type != 1) {
            // redirect to login if not logged in.
            console.log("Access denied: " + type);
            return <Navigate to='/home' />;
        }

        return children;
    };

    const VProtectedRoute = ({ children }) => {
        const type = user?.type;
        if (!isAuthenticated || type != 2) {
            // redirect to home if not logged in.
            return <Navigate to='/home' />;
        }

        return children;
    };


    // adding paths
    return (
        <AuthContext.Provider value={authContextValue}>
            <BrowserRouter>
                <CustomNavbar />
                <Routes>
                    <Route path='/home' element={<LandingPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/vsignup' element={<VenueSignup />} />
                    <Route path='/vlogin' element={<VenueLogin />} />
                    <Route path='/admin-dash' element={<AdminDashRedirect />} />
                    <Route
                        path='/password-reset'
                        element={<PasswordResetForm />}
                    />
                    <Route
                        path='/dashboard'
                        element={
                            <UProtectedRoute>
                                <Dashboard />
                            </UProtectedRoute>
                        }
                    />
                    <Route
                        path='/vdashboard'
                        element={
                            <VProtectedRoute>
                                <VenueDashboard />
                            </VProtectedRoute>
                        }
                    />
                    <Route path='/admin' element={<AdminDashRedirect />} />
                    <Route path='/pay' element={<PaymentForm />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    {/* redirect to login if no other routes matched (can update to splash maybe?) */}
                    <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
