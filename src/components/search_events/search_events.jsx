import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [eventLocation, setEventLocation] = useState('');

    const searchEvents = async (query, eventLocation) => {
        try {
            const response = await fetch(`https://p465-backend-latest-1.onrender.com/events/search_events/?q=${query}&eventLocation=${eventLocation}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Response data:", data);
            props.setEvents(data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const query = searchTerm;
        searchEvents(query, eventLocation);
        performSearch();
    };

    const performSearch = () => {
        props.setSearched(true); // Indicate that a search has been made
    }

    return (
        <Container className="text-white">
            <h2 className="mb-4 text-white font-weight-bold">Search Events</h2>
            <Form onSubmit={handleSearch} className="search-form">
                <Form.Group controlId="searchTerm" className="mb-3">
                    <Form.Label className="fs-5 font-weight-bold">Search Term</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search by keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent text-white search-input"
                    />
                </Form.Group>
                <Form.Group controlId="evenLtocation" className="mb-3">
                    <Form.Label className="fs-5 font-weight-bold">Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Filter by eventLocation..."
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="bg-transparent text-white search-input"
                    />
                </Form.Group>
                <Form.Group controlId="filterSelect" className="mb-4">
                    <Form.Label className="fs-5 font-weight-bold">Filter</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="bg-transparent text-white filter-select"
                    >
                        <option value="">All</option>
                        <option value="price - low to high">Price - Low to High</option>
                        <option value="time - near to future">Time - Near to Future</option>
                        {/* Add more filter options as needed */}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="px-4 py-2 search-button">
                    Search
                </Button>
            </Form>
        </Container>
    );
};

export default Search;
