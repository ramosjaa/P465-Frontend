import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Container, Button } from 'react-bootstrap';

const VenueDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null); // Add state for storing user data

    useEffect(() => {
        document.title = 'Venue Dashboard | RhythmReserve';
        fetchVenueData();
    }, []);
    
    const fetchVenueData = async () => {
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
            const response = await fetch('http://localhost:8000/auth/get_venue_data/', {
                method: 'GET', // Assuming you change to a POST method in your backend
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send the email in the request body
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data); // Update the state with fetched data
            console.log("userData: " + userData);
        } catch (error) {
            console.error('Error fetching venue data:', error);
        }
    };

    const handleLogout = () => {
        logout(); // update 
        navigate('/vlogin'); // redirect to login page afterwards
    };

    const createEvent = () => {
        //navigate('/create_event;);
    }

    return (
        <div>
            <div className="home-page text-white fw-bold">
                <div className="dashboard">
                    <h1>Welcome!</h1>
                    <p>You are now logged in! See events below!</p>
                    
                    <Button onClick={createEvent} className="btn-styles me-2" variant="primary" size="sm">Create Event</Button>
                    {/* 
                    As we flesh out the event app in the backend, this should eventually 
                    get the number of events that include this venue as the venue name and make the cards that way. 
                    This is placeholder for now.
                */}
                    <div className="row mt-5">
                        {[...Array(9)].map((_, index) => (
                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div className="card">
                                    <img src="https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1682714955/brooksschoolorg/aucb7xbkp18dwu78z7mw/cabaret23-thumb.jpg" className="card-img-top" alt="Placeholder" />
                                    <div className="card-body">
                                        <h5 className="card-title">Event</h5>
                                        <button className="btn btn-primary">Edit</button>

                                        <button className="btn btn-primary">Delete</button>
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

export default VenueDashboard;