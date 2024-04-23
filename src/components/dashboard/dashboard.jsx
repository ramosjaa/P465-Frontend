import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button, Col, Card, Row, Modal } from 'react-bootstrap';
import Search from '../search_events/search_events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';


const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [events, setEvents] = useState([]);
    const [searched, setSearched] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        document.title = 'Dashboard | RhythmReserve';
        fetchUpcomingEvents();
    }, []);

    const fetchUpcomingEvents = async () => {
        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/events/upcoming_events/'); // Ensure this matches your actual API endpoint
            const data = await response.json();
            if (data.events && data.events.length) {
                setUpcomingEvents(data.events);
            }
            console.log("upcoming events", data);
            console.log("upcom", upcomingEvents);
        } catch (error) {
            console.error('Failed to fetch upcoming events:', error);
        }
    };


    const handleShow = (event) => {
        setShow(true);
        setSelectedEvent(event);
    };

    const handlepriceClick = (event_name, event_time, price, type) => {
        const priceDetails = {
            event_name: event_name,
            event_time: event_time,
            price: price,
            type: type  // Add the ticket type to the navigation state
        };
        navigate("/pay", { state: priceDetails });
    }



    const handleClose = () => setShow(false);

    const redirectToPaymentForm = (ticketType) => {
        console.log(`Redirecting to payment form for ${ticketType} ticket...`);
        // Redirect logic here, for demonstration purposes only
        navigate('/pay');
        handleClose();
    };

    console.log(events, "dashboard");
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
                                                    <p>Event Time: {event.fields.event_time}</p>
                                                    <p>General Price: {event.fields.general_admission_price}</p>
                                                    <p>VIP Price: {event.fields.vip_ticket_price}</p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleShow(event)}>Buy Tickets</Button>
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
                        // Display upcoming events if no search has been performed
                        upcomingEvents.length > 0 ? (
                            <Row xs={1} md={3} className="g-4">
                                {upcomingEvents.slice(3, 12).map((event, index) => (
                                    <Col key={index}>
                                        <Card>
                                            <Card.Img variant="top" src={event.event_image_url} />
                                            <Card.Body>
                                                <Card.Title>{event.event_name}</Card.Title>
                                                <Card.Text>
                                                    <p>Location: {event.event_location}</p>
                                                    <p>Description: {event.description}</p>
                                                    <p>Event Time: {event.event_time}</p>
                                                    <p>General Price: {event.general_admission_price}</p>
                                                    <p>VIP Price: {event.vip_ticket_price}</p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => handleShow(event)}>Buy Tickets</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="row mt-5">
                                <p>No upcoming events to show or search is active</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Modal for selecting ticket type and redirecting to payment form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <p>Please select the type of ticket you would like to purchase:</p>
                            <Button variant="secondary" onClick={() => handlepriceClick(selectedEvent.fields.event_name,
                                selectedEvent.fields.event_time,selectedEvent.fields.general_admission_price, 'General Admission'
                            )}>
                                General Admission - {selectedEvent.fields.general_admission_price}
                            </Button>
                            <Button variant="success" onClick={() => handlepriceClick(selectedEvent.fields.event_name,
                                selectedEvent.fields.event_time,selectedEvent.fields.vip_ticket_price, 'VIP'
                            )}>
                                VIP Ticket - {selectedEvent.fields.vip_ticket_price}
                            </Button>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Dashboard;
