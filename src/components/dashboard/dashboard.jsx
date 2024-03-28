import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import Search from '../search_events/search_events';


const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
        //fetchUserData(); // Fetch user data on component mount
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            
            <div className="home-page text-white fw-bold">
                <div className="dashboard">
                    <h1>Welcome your dashboard!</h1>
                    <p>You are now logged in! See venues below!</p>
                    <Search />

                {/* Grid of cards */}
                <div className="row mt-5">
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card">
                                <img src="https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1682714955/brooksschoolorg/aucb7xbkp18dwu78z7mw/cabaret23-thumb.jpg" className="card-img-top" alt="Placeholder" />
                                <div className="card-body">
                                    <h5 className="card-title">Venue</h5>
                                    <p className="card-text">Click to see concerts</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;