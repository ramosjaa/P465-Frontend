import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // handle searching with the API here and change the cards with the filter
    console.log(`Searching for: ${searchTerm} with filter: ${selectedFilter}`);
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