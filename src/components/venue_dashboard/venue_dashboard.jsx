import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const VenueDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Venue Dashboard | RhythmReserve';
    }, []);

    const handleLogout = () => {
        logout(); // update 
        navigate('/vlogin'); // redirect to login page afterwards
    };

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
                        </Nav>
                        <div>
                            <Button onClick={handleLogout} className="btn-styles me-2" variant="primary" size="sm">Logout</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="home-page text-white fw-bold">
                <div className="dashboard">
                    <h1>Welcome your dashboard!</h1>
                    <p>You are now logged in! See events below!</p>
                    
                    <button className="btn btn-primary">Create Event</button>
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