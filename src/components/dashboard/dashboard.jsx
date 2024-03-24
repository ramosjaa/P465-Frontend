import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Search from '../search_events/search_events';


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