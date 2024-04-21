import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingpage.css';
import '../../App.css';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";


const LandingPage = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <div className="home-page">
                <Container fluid className="px-0 main-header">
                    <div className="text-center header-content">
                        <h1 className="display-1">Heaven of Music</h1>
                        <p className="lead">Jakarta - August 11 - 12 - 13, 2023</p>
                        <Button className="btn-styles" variant="primary" size="lg" onClick={handleClick}>
                            Buy Ticket →
                        </Button>
                    </div>
                </Container>
            </div>
        </div>

    );
};

export default LandingPage;