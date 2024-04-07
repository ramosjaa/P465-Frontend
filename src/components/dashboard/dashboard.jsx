import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import {Navbar, Nav, Container, Button, Col, Card, Row} from 'react-bootstrap';
import Search from '../search_events/search_events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // Add state for storing user data
    const [events, setEvents] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
    }, []);

    console.log(events,"dashboard");
    return (
        <div>
            <div className="home-page text-white fw-bold">
                <div className="dashboard">
                    <h1>Welcome to your dashboard!</h1>
                    <p>You are now logged in! See venues below!</p>
                    <Search setEvents={setEvents} setSearched={setSearched}/>

                    {/* Check if a search has been performed */}
                    {searched ? (
                        // If a search has been performed, only show this conditional based on events.length
                        events.length > 0 ? (
                            <Row xs={1} md={3} className="g-4">
                                {events.map((event, index) => (
                                    <Col key={index}>
                                        <Card>
                                            <Card.Img variant="top" src={event.fields.event_image_url}/>
                                            <Card.Body>
                                                <Card.Title>{event.fields.event_name}</Card.Title>
                                                <Card.Text>
                                                    <p>Location: {event.fields.event_location}</p>
                                                    <p>Description: {event.fields.description}</p>
                                                    {/* Add more event details as needed */}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            // No results found after search
                            <div className="row mt-5">
                                <p>No related content found</p>
                            </div>
                        )
                    ) : (
                        // Default state, where no search has been performed yet, so show default cards
                        <div className="row mt-5">
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <div className="card">
                                        <img
                                            src="https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1682714955/brooksschoolorg/aucb7xbkp18dwu78z7mw/cabaret23-thumb.jpg"
                                            className="card-img-top" alt="Placeholder"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Venue</h5>
                                            <p className="card-text">Click to see concerts</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;