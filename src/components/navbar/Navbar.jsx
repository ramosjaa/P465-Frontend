import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import React, { useContext, useEffect, useState } from 'react';

const NavButtons = () => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const user = sessionStorage.getItem('user');
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    const fetchUserData = () => {
        // Retrieve the user's email from session storage
        const email = user?.email;

        // Early exit if no email found
        if (!email) {
            console.error('No email found in session storage.');
            return;
        }

        try {
            // Adjust the URL and request method according to your backend setup
            const response = fetch('http://localhost:8000/auth/get_user_data/', {
                method: 'GET', // Assuming you change to a POST method in your backend
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = response.json();
            setUserData(data); // Update the state with fetched user data
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // navbar buttons should be different based on authentication status
    if (isAuthenticated) {
        if (user?.type == 1) {
            return (
                <div>
                    {fetchUserData()}
                    {/* User info popup logic here, positioned relative to the entire page or Navbar */}
                    {showUserInfo && userData && (
                        <div className="user-info-popup position-fixed top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '15px', top: '56px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
                            <h5>User Info</h5>
                            <p>Name: {userData.firstName} {userData.lastName}</p>
                            <p>Username: {userData.username}</p>
                            <p>Email: {userData.email}</p>
                            <p>Phone Number: {userData.phoneNumber}</p>
                            <p>Spotify Username: {userData.spotifyUsername}</p>
                            <Button onClick={handleLogout} className="btn-styles me-2" variant="primary" size="sm">Logout</Button>
                        </div>
                    )}
                </div>
            );
        } else if(user?.type == 2){
            return(
                <Button onClick={handleLogout} className="btn-styles me-2" variant="primary" size="sm">Logout</Button>
            )
        }
    } else {
        return (
            <div>
                <Button className="btn-styles me-2" variant="primary" size="sm" href="/login">Login</Button>
                <Button className="btn-styles me-2" variant="primary" size="sm" href="/signup">User
                    Signup</Button>
                <Button className="btn-styles me-5" variant="primary" size="sm" href="/vsignup">Venue
                    Signup</Button>
            </div>
        );
    }
}

const CustomNavbar = () => {

    return (
        <Navbar bg="none" variant="dark" expand="lg" className="justify-content-between">
            <Container fluid>
                <Navbar.Brand href="/home" className="text-white fs-3 fw-bold ml-5">Rhythm Reserve</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto fw-normal custom-nav-links">
                        <Nav.Link href="#events" className="me-2">Events</Nav.Link>
                        <Nav.Link href="#live" className="me-2">Live</Nav.Link>
                        <Nav.Link href="#venues" className="me-2">Venues</Nav.Link>
                    </Nav>
                    <NavButtons />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar;