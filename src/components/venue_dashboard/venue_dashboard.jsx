import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Navbar, Nav, Container, Button, Form, Modal } from 'react-bootstrap';

const VenueDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Venue Dashboard | RhythmReserve';
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/vlogin');
    };

    const [showEventForm, setShowEventForm] = useState(false);

    const handleClose = () => setShowEventForm(false);
    const handleShow = () => setShowEventForm(true);

    const [eventName, setEventName] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState('');
    const [availableGeneralAdmissionTickets, setAvailableGeneralAdmissionTickets] = useState('');
    const [generalAdmissionPrice, setGeneralAdmissionPrice] = useState('');
    const [availableVipTickets, setAvailableVipTickets] = useState('');
    const [vipTicketPrice, setVipTicketPrice] = useState('');
    const [eventGenre, setEventGenre] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleCreateEvent = () => {
        console.log({
            eventName,
            eventTime,
            eventLocation,
            eventImageUrl,
            availableGeneralAdmissionTickets,
            generalAdmissionPrice,
            availableVipTickets,
            vipTicketPrice,
            eventGenre,
            eventDescription
        });

        setEventName('');
        setEventTime('');
        setEventLocation('');
        setEventImageUrl('');
        setAvailableGeneralAdmissionTickets('');
        setGeneralAdmissionPrice('');
        setAvailableVipTickets('');
        setVipTicketPrice('');
        setEventGenre('');
        setEventDescription('');

        handleClose();
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
                    
                    <Button className="btn btn-primary" onClick={handleShow}>Create Event</Button>

                    <Modal show={showEventForm} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* Input fields for event attributes */}
                                <Form.Group controlId="eventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="eventTime">
                                <Form.Label>Event Time</Form.Label>
                                <Form.Control type="text" placeholder="Enter event time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="eventLocation">
                                <Form.Label>Event Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter event location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="eventImageUrl">
                                <Form.Label>Event Image Url</Form.Label>
                                <Form.Control type="text" placeholder="Enter event image url" value={eventImageUrl} onChange={(e) => setEventImageUrl(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="availableGeneralAdmissionTickets">
                                <Form.Label>Available General Admission Tickets</Form.Label>
                                <Form.Control type="text" placeholder="Enter available general admission tickets" value={availableGeneralAdmissionTickets} onChange={(e) => setAvailableGeneralAdmissionTickets(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="generalAdmissionPrice">
                                <Form.Label>General Admission Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter general admission price" value={generalAdmissionPrice} onChange={(e) => setGeneralAdmissionPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="avaliableVIPTickets">
                                <Form.Label>Avaliable VIP Tickets</Form.Label>
                                <Form.Control type="text" placeholder="Enter avaliable VIP tickets" value={availableVipTickets} onChange={(e) => setAvailableVipTickets(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="vipTicketPrice">
                                <Form.Label>VIP Ticket Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter VIP Ticket Price" value={vipTicketPrice} onChange={(e) => setVipTicketPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="eventGenre">
                                <Form.Label>Event Genre</Form.Label>
                                <Form.Control type="text" placeholder="Enter event genre" value={eventGenre} onChange={(e) => setEventGenre(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="eventDescription">
                                <Form.Label>Event Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter event description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                            </Form.Group>
                                {/* Add similar Form.Group for other attributes */}
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleCreateEvent}>Create Event</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Existing event cards */}
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
