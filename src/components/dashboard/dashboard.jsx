import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Search from '../search_events/search_events';


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
        <div>
            <Navbar bg="none" variant="dark" expand="lg" className="justify-content-between">
                <Container fluid>
                    <Navbar.Brand href="/home" className="text-white fs-3 fw-bold ml-5">Rhythm Reserve</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto fw-normal custom-nav-links">
                            <Nav.Link href="#events" className="me-2">Events</Nav.Link>
                            <Nav.Link href="#live" className="me-2">Live</Nav.Link>
                            <Nav.Link href="#venues" className="me-2">Venues</Nav.Link>
                            <Button onClick={toggleUserInfo} className="btn-secondary ms-2">
                                <i className="fas fa-user"></i> {/* User icon */}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* User info popup logic here, positioned relative to the entire page or Navbar */}
            {showUserInfo && userData && (
                <div className="user-info-popup position-fixed top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '15px', top: '56px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
                    <h5>User Info</h5>
                    <p>Name: {userData.firstName} {userData.lastName}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone Number: {userData.phoneNumber}</p>
                    <p>Spotify Username: {userData.spotifyUsername}</p>
                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </div>
            )}
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