import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landingpage.css';
import '../../App.css';
import { Container, Button } from 'react-bootstrap';
import ChatWidget from './chatWidget'; // make sure the path matches where you placed your ChatWidget file
import {useNavigate} from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="home-page">
            <Container fluid className="px-0 main-header">
                <div className="text-center header-content">
                    <h1 className="display-1">Heaven of Music</h1>
                    <p className="lead">Jakarta - August 11 - 12 - 13, 2023</p>
                    <Button className="btn-styles" variant="primary" size="lg"> Buy Ticket → </Button>
                </div>
            </Container>
            <ChatWidget /> {/* This adds the chat widget to the UI */}
        </div>
    );
};

export default LandingPage;
