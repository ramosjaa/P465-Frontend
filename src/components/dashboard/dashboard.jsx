import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Search from '../search_events/search_events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    // edit user profile storage
    const [editMode, setEditMode] = useState(false);
    const [editableUserData, setEditableUserData] = useState(null);


    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
        fetchUserData(); // Fetch user data on component mount
    }, []);

    const fetchUserData = async () => {
        // Retrieve the user's email from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
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
            console.log(data);
            setUserData(data); // Update the state with fetched user data
            setEditableUserData({...data});
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleConfirm = async () => {
        console.log(editableUserData)
        try {
            // Adjust with your actual endpoint and method
            const response = await fetch('http://localhost:8000/user_actions/edit_profile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableUserData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
    
            const updatedData = await response.json();
            setUserData(updatedData); // Update userData with the confirmed data
            setEditableUserData({...updatedData}); // Also update editableUserData
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating user data:', error);
        }
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
                            <Button onClick={toggleUserInfo} className="btn-primary ms-2">
                                <FontAwesomeIcon icon={faUser} /> {/* Correctly reference the imported icon */}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* User info popup logic here, positioned relative to the entire page or Navbar */}

            {showUserInfo && editableUserData && (
            <div className="user-info-popup position-fixed top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '15px', top: '56px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}> {editMode ? (
            <> {/* editing display */}
                <div>
                    
                    {/* user info */}

                    <h5 style={{ fontWeight: 'bold'}}>User Info</h5>

                    <p>Name: {userData.firstName} {userData.lastName}</p>
                    <p>Email: {userData.email}</p>

                    <div className="form-group">
                        <label htmlFor="username" style={{ marginRight: '10px' }}>Username: </label>
                        <input
                            type="text"
                            id="username"
                            value={editableUserData.username}
                            onChange={(e) => setEditableUserData({...editableUserData, username: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spotifyUsername" style={{ marginRight: '10px' }}>Spotify Username: </label>
                        <input
                            type="text"
                            id="spotifyUsername"
                            value={editableUserData.spotifyUsername}
                            onChange={(e) => setEditableUserData({...editableUserData, spotifyUsername: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber" style={{ marginRight: '10px' }}>Phone Number: </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={editableUserData.phoneNumber}
                            onChange={(e) => setEditableUserData({...editableUserData, phoneNumber: e.target.value})}
                        />
                    </div>

                    <hr />

                    {/* payment info */}

                    <h5 style={{ fontWeight: 'bold'}}>Payment Info</h5>
                
                    <div className="form-group">
                        <label htmlFor="cardHolderName" style={{ marginRight: '10px' }}>Card Holder Name: </label>
                        <input
                            type="text"
                            id="cardHolderName"
                            value={editableUserData.cardHolderName}
                            onChange={(e) => setEditableUserData({...editableUserData, cardHolderName: e.target.value})}
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="cardNumber" style={{ marginRight: '10px' }}>Card Number: </label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={editableUserData.cardNumber}
                            onChange={(e) => setEditableUserData({...editableUserData, cardNumber: e.target.value})}
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="expMonth" style={{ marginRight: '10px' }}>Expiration Date:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                id="expMonth"
                                placeholder="MM"
                                style={{ width: '60px', marginRight: '5px' }}
                                value={editableUserData.expMonth}
                                onChange={(e) => setEditableUserData({...editableUserData, expMonth: e.target.value})}
                            />
                            <span>/</span>
                            <input
                                type="text"
                                id="expYear"
                                placeholder="YYYY"
                                style={{ width: '80px', marginLeft: '5px' }}
                                value={editableUserData.expYear}
                                onChange={(e) => setEditableUserData({...editableUserData, expYear: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="cvv" style={{ marginRight: '10px' }}>CVV: </label>
                        <input
                            type="text"
                            id="cvv"
                            style={{ width: '80px', marginLeft: '5px' }}
                            value={editableUserData.cvv}
                            onChange={(e) => setEditableUserData({...editableUserData, cvv: e.target.value})}
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="zipCode" style={{ marginRight: '10px' }}>Zip Code: </label>
                        <input
                            type="text"
                            id="zipCode"
                            style={{ width: '80px', marginLeft: '5px' }}
                            value={editableUserData.zipCode}
                            onChange={(e) => setEditableUserData({...editableUserData, zipCode: e.target.value})}
                        />
                    </div>

                    
                </div>

                <button onClick={handleConfirm} className="btn btn-primary">Confirm</button>

            </>
        ) : (
            <> {/* regular display */}
                <div className="user-info-popup position-fixed top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '15px', top: '56px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}>
                    <h5 style={{ fontWeight: 'bold' }}>User Info</h5>

                    <p>Name: {userData.firstName || 'N/A'} {userData.lastName || 'N/A'}</p>
                    <p>Email: {userData.email || 'N/A'}</p>
                    <p>Username: {userData.username || 'N/A'}</p>
                    <p>Spotify Username: {userData.spotifyUsername || 'N/A'}</p>
                    <p>Phone Number: {userData.phoneNumber || 'N/A'}</p>

                    <hr />

                    <h5 style={{ fontWeight: 'bold' }}>Payment Info</h5>

                    <p>Card Holder Name: {userData.cardHolderName || 'N/A'}</p>
                    <p>Card Number: {userData.cardNumber ? `**** **** **** ${userData.cardNumber.slice(-4)}` : 'N/A'}</p> 
                    <p>Expiration Date: {(userData.expMonth && userData.expYear) ? `${userData.expMonth}/${userData.expYear}` : 'N/A'}</p>
                    <p>CVV: {userData.cvv ? '***' : 'N/A'}</p>
                    <p>Zip Code: {userData.zipCode || 'N/A'}</p>

                    <button onClick={() => setEditMode(true)} style={{ marginRight: '10px' }} className="btn btn-primary">Edit Profile</button>
                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </div>
            </>
        )}
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