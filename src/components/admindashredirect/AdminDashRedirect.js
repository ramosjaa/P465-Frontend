import React from 'react';
import './AdminDashRedirect.css';
import { Container, Row, Col, Card, Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

const AdminDashRedirect = () => {
  return (
      <>
        <Navbar bg="dark" expand="lg" className="mb-4">
          <Container fluid>
            <Navbar.Brand href="#" className="text-white">Admin</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#viewUsers">View Users</Nav.Link>
              <Nav.Link href="#settings">Settings</Nav.Link>
              <Nav.Link href="#venues">Venues</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Button variant="primary" className="ms-2">Create Event</Button>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                  className="ms-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
              >
                <Nav.Link href="#profile">Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid>
          <Row>
            <Col xs={2} className="bg-dark border-end" id="sidebar-wrapper">
              <Nav className="flex-column">
                <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#createVenue">Create Venue</Nav.Link>
                <Nav.Link href="#signOut">Sign Out</Nav.Link>
                {/* Add more sidebar items as needed */}
              </Nav>
            </Col>

            <Col xs={10} id="page-content-wrapper">
              <Card className="mb-4">
                <Card.Header as="h5">Dashboard</Card.Header>
                <Card.Body>
                  <Card.Title>Welcome back, admin</Card.Title>
                  <h6>Upcoming Events</h6>
                  <Row xs={1} md={3} className="g-4">
                    {/* Map through your events here */}
                    <Col>
                      <Card>
                        <Card.Img variant="top" src="path-to-your-event-image" />
                        <Card.Body>
                          <Card.Title>Live Panel: The Future of Work</Card.Title>
                          <Card.Text>Mar 22, 12:00 PM - 1:00 PM</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    {/* Repeat for other events */}
                  </Row>

                  <h6 className="mt-4">Recent Venues</h6>
                  <Row xs={1} md={3} className="g-4">
                    {/* Map through your venues here */}
                    <Col>
                      <Card>
                        <Card.Body>
                          <Card.Title>Vogue Magazine</Card.Title>
                          <Card.Text>Fashion</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    {/* Repeat for other venues */}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  );
};

export default AdminDashRedirect;
