import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const VenueDashboard = () => {
    useEffect(() => {
        document.title = 'Venue Dashboard | RhythmReserve';
    }, []);

    const [showEventForm, setShowEventForm] = useState(false);

    const handleClose = () => setShowEventForm(false);
    const handleShow = () => setShowEventForm(true);

    // const [eventName, setEventName] = useState('');
    // const [eventTime, setEventTime] = useState('');
    // const [eventLocation, setEventLocation] = useState('');
    // const [eventImage, setEventImage] = useState(null);
    // const [availGATix, setAvailGATix] = useState('');
    // const [gaPrice, setGAPrice] = useState('');
    // const [availVipTix, setAvailVipTix] = useState('');
    // const [vipPrice, setVipPrice] = useState('');
    // const [eventGenre, setEventGenre] = useState('');
    // const [eventDescription, setEventDescription] = useState('');

    const [formData, setFormData] = useState({
        eventName: '',
        eventLocation: '',
        venueUserEmail: '',
        eventImage: '',
        availGATix: '',
        gaPrice: '',
        availVipTix: '',
        vipPrice: '',
        eventGenre: '',
        eventDescription: ''
    });

    const [eventImage, setEventImage] = useState(null);
    const [date, setDate] = useState(new Date());
    const [eventTime, setEventTime] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        const payloadData = new FormData();
        const user = sessionStorage.getItem('user');
        payloadData.append('venueUser', user?.email);
        payloadData.append('eventName', formData.eventName);
        payloadData.append('eventTime', eventTime);
        payloadData.append('eventLocation', formData.eventLocation);
        payloadData.append('venueUserEmail', formData.venueUserEmail);
        payloadData.append('eventImage', eventImage);
        payloadData.append('availGATix', formData.availGATix);
        payloadData.append('gaPrice', formData.gaPrice);
        payloadData.append('availVipTix', formData.availVipTix);
        payloadData.append('vipPrice', formData.vipPrice);
        payloadData.append('eventGenre', formData.eventGenre);
        payloadData.append('eventDescription', formData.eventDescription);

        console.log(JSON.stringify(payloadData));
        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/events/create_event/', {
                method: 'POST',
                body: payloadData, // Send formData instead of JSON
            });

            console.log(JSON.stringify(payloadData));

            const data = await response.json();
            if (response.ok) {
                console.log('Registration Success:', data);
                alert('Event created successfully!');
            } else {
                console.error('Creation Error:', data.error);
                alert('Event creation failed: ' + data.error);
            }
        } catch (error) {
            console.error('Request Failed:', error);
            alert('An error occurred. Please try again.');
        }

        handleClose();
    };

    return (
        <div>
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
                            <form>
                                {/* Input fields for event attributes */}
                                {eventImage && (
                                    <div>
                                        <img
                                            alt="not found"
                                            width={"100px"}
                                            src={URL.createObjectURL(eventImage)}
                                        />
                                        <br/>
                                        <button onClick={() => {
                                            setEventImage(null);
                                        }}>Remove
                                        </button>
                                    </div>
                                )}

                                <br/>
                                <br/>

                                <input
                                    type="file"
                                    name="eventImage"
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setEventImage(event.target.files[0]);
                                    }}
                                />
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="eventName"
                                               className="form-label">Event Name</label>
                                        <input
                                            type="text"
                                            id="eventName"
                                            name="eventName"
                                            className="form-control"
                                            value={formData.eventName}
                                            onChange={handleChange}
                                            placeholder="Event Name"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* <div className="d-flex flex-row align-items-center mb-3"> 
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="eventTime"
                                            className="form-label">Event Time</label>
                                        <input
                                            type="text"
                                            id="eventTime"
                                            name="eventTime"
                                            className="form-control"
                                            value={formData.eventTime}
                                            onChange={handleChange}
                                            placeholder="Event Time"
                                            required
                                        />
                                    </div> 
                                </div>
                                */}

                                <div>
                                    <Calendar
                                        calendarType='gregory'
                                        onChange={(value) => setEventTime(value.toDateString())}
                                        value={date}
                                    />
                                </div>
                                <div>
                                    <p>You selected: {eventTime}</p>
                                </div>

                                <br/>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="eventLocation"
                                            className="form-label">Event Location</label>
                                        <input
                                            type="text"
                                            id="eventLocation"
                                            name="eventLocation"
                                            className="form-control"
                                            value={formData.eventLocation}
                                            onChange={handleChange}
                                            placeholder="Event Location"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="venueUserEmail" className="form-label">Venue User Email</label>
                                        <input
                                            type="email"
                                            id="venueUserEmail"
                                            name="venueUserEmail"
                                            className="form-control"
                                            value={formData.venueUserEmail}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="availGATix"
                                            className="form-label">Available GA Tickets</label>
                                        <input
                                            type="text"
                                            id="availGATix"
                                            name="availGATix"
                                            className="form-control"
                                            value={formData.availGATix}
                                            onChange={handleChange}
                                            placeholder="Available GA Tickets"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="gaPrice"
                                            className="form-label">GA Price</label>
                                        <input
                                            type="text"
                                            id="gaPrice"
                                            name="gaPrice"
                                            className="form-control"
                                            value={formData.gaPrice}
                                            onChange={handleChange}
                                            placeholder="GA Price"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="availVipTix"
                                            className="form-label">Available VIP Tickets</label>
                                        <input
                                            type="text"
                                            id="availVipTix"
                                            name="availVipTix"
                                            className="form-control"
                                            value={formData.availVipTix}
                                            onChange={handleChange}
                                            placeholder="Available VIP Tickets"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="vipPrice"
                                            className="form-label">VIP Price</label>
                                        <input
                                            type="text"
                                            id="vipPrice"
                                            name="vipPrice"
                                            className="form-control"
                                            value={formData.vipPrice}
                                            onChange={handleChange}
                                            placeholder="VIP Price"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="eventGenre"
                                            className="form-label">Event Genre</label>
                                        <input
                                            type="text"
                                            id="eventGenre"
                                            name="eventGenre"
                                            className="form-control"
                                            value={formData.eventGenre}
                                            onChange={handleChange}
                                            placeholder="Event Genre"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <label htmlFor="eventDescription"
                                            className="form-label">Event Description</label>
                                        <input
                                            type="text"
                                            id="eventDescription"
                                            name="eventDescription"
                                            className="form-control"
                                            value={formData.eventDescription}
                                            onChange={handleChange}
                                            placeholder="Event Description"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Add similar Form.Group for other attributes */}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleCreateEvent}>Create Event</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default VenueDashboard;
