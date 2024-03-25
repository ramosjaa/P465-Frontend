import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingpage.css';
import '../../App.css';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faGoogle,
    faInstagram,
    faLinkedinIn,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {
    return (
        <div>
            <div className="home-page">
                {/* Navigation Bar */}
                <Navbar bg="none" variant="dark" expand="lg" className="justify-content-between">
                    <Container fluid>
                        <Navbar.Brand href="/home" className="text-white fs-3 fw-bold ml-5">Rhythm Reserve</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto fw-normal custom-nav-links">
                                <Nav.Link href="#events" className="me-2">Events</Nav.Link>
                                <Nav.Link href="#live" className="me-2">Live</Nav.Link>
                                <Nav.Link href="#venues" className="me-2">Venues</Nav.Link>
                            </Nav>
                            <div>
                                <Button className="btn-styles me-2" variant="primary" size="sm" href="/login">Login</Button>
                                <Button className="btn-styles me-2" variant="primary" size="sm" href="/signup">User
                                    Signup</Button>
                                <Button className="btn-styles me-5" variant="primary" size="sm" href="/vsignup">Venue
                                    Signup</Button>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container fluid className="px-0 main-header">
                    <div className="text-center header-content">
                        <h1 className="display-1">Heaven of Music</h1>
                        <p className="lead">Jakarta - August 11 - 12 - 13, 2023</p>
                        <Button className="btn-styles" variant="primary" size="lg"> Buy Ticket → </Button>

                    </div>
                </Container>
            </div>
            <div style={{position:"relative"}}>
                <footer
                    className="text-center text-lg-start text-white"
                    style={{backgroundColor: '#000000'}}
                >
                    <div className="container p-4 pb-0">
                        <section className="">
                            <div className="row">
                                <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">
                                        Company name
                                    </h6>
                                    <p>
                                        We're a ticket distribution company established by music enthusiasts and concert attendees.
                                        Our mission is to offer opportunities for emerging artists to gain exposure and cultivate
                                        their fan bases.
                                    </p>
                                </div>

                                <hr className="w-100 clearfix d-md-none"/>

                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                    <p>
                                        <a className="text-white">Events</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Venues</a>
                                    </p>
                                    <p>
                                        <a className="text-white">Live</a>
                                    </p>
                                </div>

                                <hr className="w-100 clearfix d-md-none"/>

                                <hr className="w-100 clearfix d-md-none"/>

                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                                    <p><i className="fas fa-home"></i> Bloomington, IN 47408, US</p>
                                    <p><i className="fas fa-envelope"></i> rhythmreserve@gmail.com</p>
                                    <p><i className="fas fa-phone"></i> +1 930 548 2814</p>
                                </div>

                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                    <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#3b5998'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faFacebookF}/>
                                    </a>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#55acee'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faTwitter}/>
                                    </a>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#dd4b39'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faGoogle}/>
                                    </a>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#ac2bac'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </a>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#0082ca'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faLinkedinIn}/>
                                    </a>

                                    <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: '#333333'}}
                                       href="#" role="button">
                                        <FontAwesomeIcon icon={faGithub}/>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div
                        className="text-center p-3"
                    >
                        © 2020 Copyright:
                        <a className="text-white" href="#"
                        >rhythmreserve.com</a
                        >
                    </div>
                </footer>
            </div>
        </div>

    );
};

export default LandingPage;