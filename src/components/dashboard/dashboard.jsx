import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
    }, []);

    const handleLogout = () => {
        logout(); // update 
        navigate('/login'); // redirect to login page afterwards
    };

    return (
        <div className = "home-page">
            <div className="dashboard">
                <h1>Welcome to the Dashboard</h1>
                <p>You are now logged in.</p>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;