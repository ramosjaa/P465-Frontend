import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
        fetchUserData(); // Fetch user data on component mount
    }, []);

    const fetchUserData = async () => {
        // Retrieve the user's email from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user?.email;

        // Early exit if no email found
        if (!email) {
            console.error('No email found in local storage.');
            return;
        }

        try {
            // Adjust the URL and request method according to your backend setup
            const response = await fetch('http://localhost:8000/auth/get_user_data/', {
                method: 'POST', // Assuming you change to a POST method in your backend
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data); // Update the state with fetched user data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

    return (
        <div className="home-page text-white fw-bold" style={{ position: 'relative', zIndex: 1 }}>
            <div className="dashboard">
                <h1>Welcome to your dashboard!</h1>
                <p>You are now logged in! See venues below!</p>
                <button onClick={toggleUserInfo} className="btn btn-secondary position-absolute top-0 end-0 mt-3 me-5" style={{ zIndex: 1050 }}>
                    <i className="fas fa-user"></i> {/* User icon */}
                </button>
                {showUserInfo && userData && (
                <div className="user-info-popup position-absolute top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '50px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
                    <h5>User Info</h5>
                    <p>Name: {userData.firstName} {userData.lastName}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone Number: {userData.phoneNumber}</p>
                    <p>Spotify Username: {userData.spotifyUsername}</p>
                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </div>
            )}

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
    );
};

export default Dashboard;
