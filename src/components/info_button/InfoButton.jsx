import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Button } from 'react-bootstrap';
import './InfoButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';


const InfoButton = () => {
    const navigate = useNavigate(AuthContext);
    const { logout } = useContext(AuthContext);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    // edit user profile storage
    const [editMode, setEditMode] = useState(false);
    const [editableUserData, setEditableUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        // Retrieve the user's email from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        const email = user?.email;

        // Early exit if no email found
        if (!email) {
            console.error('No email found in session storage.');
            return;
        }

        try {
            // Adjust the URL and request method according to your backend setup
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/get_user_data/', {
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
            setEditableUserData({ ...data });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/home");
    }

    const handleConfirm = async () => {
        console.log(editableUserData)
        try {
            // Adjust with your actual endpoint and method
            const response = await fetch('https://p465-backend-latest-1.onrender.com/user_actions/edit_profile/', {
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
            setEditableUserData({ ...updatedData }); // Also update editableUserData
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const toggleUserInfo = () => setShowUserInfo(!showUserInfo);

    return (
        <div>
            <Button onClick={toggleUserInfo} className="btn-primary ms-2">
                <FontAwesomeIcon icon={faUser} /> {/* Correctly reference the imported icon */}
            </Button>

            {showUserInfo && editableUserData && (
                    <div className="user-info-popup position-fixed top-0 end-0 mt-5 me-5 p-3 bg-white text-dark rounded" style={{ zIndex: 1051, right: '15px', top: '56px', boxShadow: '0 4px 6px rgba(0,0,0,.1)' }}> {editMode ? (
                        <> {/* editing display */}
                            <div>

                                {/* user info */}

                                <h5 style={{ fontWeight: 'bold' }}>User Info</h5>

                                <p>Name: {userData.firstName} {userData.lastName}</p>
                                <p>Email: {userData.email}</p>

                                <div className="form-group">
                                    <label htmlFor="username" style={{ marginRight: '10px' }}>Username: </label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={editableUserData.username}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, username: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="spotifyUsername" style={{ marginRight: '10px' }}>Spotify Username: </label>
                                    <input
                                        type="text"
                                        id="spotifyUsername"
                                        value={editableUserData.spotifyUsername}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, spotifyUsername: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber" style={{ marginRight: '10px' }}>Phone Number: </label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        value={editableUserData.phoneNumber}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, phoneNumber: e.target.value })}
                                    />
                                </div>

                                <hr />

                                {/* payment info */}

                                <h5 style={{ fontWeight: 'bold' }}>Payment Info</h5>

                                <div className="form-group">
                                    <label htmlFor="cardHolderName" style={{ marginRight: '10px' }}>Card Holder Name: </label>
                                    <input
                                        type="text"
                                        id="cardHolderName"
                                        value={editableUserData.cardHolderName}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, cardHolderName: e.target.value })}
                                    />
                                </div>

                                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="cardNumber" style={{ marginRight: '10px' }}>Card Number: </label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        value={editableUserData.cardNumber}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, cardNumber: e.target.value })}
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
                                            onChange={(e) => setEditableUserData({ ...editableUserData, expMonth: e.target.value })}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            id="expYear"
                                            placeholder="YYYY"
                                            style={{ width: '80px', marginLeft: '5px' }}
                                            value={editableUserData.expYear}
                                            onChange={(e) => setEditableUserData({ ...editableUserData, expYear: e.target.value })}
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
                                        onChange={(e) => setEditableUserData({ ...editableUserData, cvv: e.target.value })}
                                    />
                                </div>

                                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="zipCode" style={{ marginRight: '10px' }}>Zip Code: </label>
                                    <input
                                        type="text"
                                        id="zipCode"
                                        style={{ width: '80px', marginLeft: '5px' }}
                                        value={editableUserData.zipCode}
                                        onChange={(e) => setEditableUserData({ ...editableUserData, zipCode: e.target.value })}
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
                )
            }
        </div>
    );
}

export default InfoButton;