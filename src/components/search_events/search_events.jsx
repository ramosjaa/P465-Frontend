import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  // const [events, setEvents] = useState([]);

    const searchEvents = async (query) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/events/search_events/?q=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(response);// Parse response body as JSON
            console.log("Response data:", data); // Log parsed response data
            props.setEvents(data); // Set parsed JSON data to events state
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    const handleSearch = (event, setEvents) => {
        event.preventDefault();
        console.log(event.target.elements.searchTerm.value); // Check the event target
        const query = event.target.elements.searchTerm.value;
        console.log(query); // Check the value of query
        searchEvents(query, props.setEvents);
    };


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
          Filter
        </Button>
      </Form>
    </Container>
  );
};

export default Search;