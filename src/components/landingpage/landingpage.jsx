import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingpage.css';
import '../../App.css';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';

const LandingPage = () => {
    return (
        <div className="home-page">
            {/* Navigation Bar */}
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
                            <Button className="btn-styles me-2" variant="primary" size="sm" href="/login">Login</Button>
                            <Button className="btn-styles me-2" variant="primary" size="sm" href="/signup">User Signup</Button>
                            <Button className="btn-styles me-5" variant="primary" size="sm" href="/vsignup">Venue Signup</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="px-0 main-header">
                <div className="text-center header-content">
                    <h1 className="display-1">Heaven of Music</h1>
                    <p className="lead">Jakarta - August 11 - 12 - 13, 2023</p>
                    <Button className="btn-styles" variant="primary" size="lg">  Buy Ticket → </Button>

                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
