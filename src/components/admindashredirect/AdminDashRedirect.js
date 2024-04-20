import './AdminDashRedirect.css';
import { Container, Row, Col, Card, Navbar, Nav, Button, Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';

const AdminDashRedirect = () => {
  const [events, setEvents] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);
  const [activeChats, setActiveChats] = useState([]); // State to store active chats
  const [selectedChat, setSelectedChat] = useState(null); // State to store the selected chat

  const fetchAllChats = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/chat_support/api/chats/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Fetched chats:", data);  // Log to check the fetched data
        setActiveChats(data);
    } catch (error) {
        console.error('There was a problem with fetching all chats:', error);
    }
};


  useEffect(() => {
    fetchAllChats();
  }, []);

  const handleSelectChat = (chat) => {
    console.log(chat);  // Log to verify the structure of the chat object
    if (!chat || !chat.session_id) {
        console.error("Selected chat is undefined or lacks an 'id' property:", chat);
        return;  // Prevent further execution if the chat id is undefined
    }
    setSelectedChat(chat);
    setChatMessages([]); // Clear previous messages

    fetch(`http://127.0.0.1:8000/chat_support/api/chat_sessions/${chat.session_id}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setChatMessages(data.messages || []);
      })
      .catch(error => console.error('Error fetching chat messages:', error));
};




  const sendMessage = (e) => {
    e.preventDefault();
    if (ws && newMessage !== "" && selectedChat) {
      // Construct the message with 'admin' as the sender
      const message = {
        text: newMessage,
        sender: 'admin', // Fixed sender name
        session_id: selectedChat.session_id, // Include the session ID to associate the message
      };
      // Send the message as a stringified JSON object
      ws.send(JSON.stringify(message));
      // Reset the input field for new messages
      setNewMessage('');
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const searchEvents = async (query) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/events/search_events/?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(response);// Parse response body as JSON
      console.log("Response data:", data); // Log parsed response data
      setEvents(data); // Set parsed JSON data to events state
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    searchEvents(query);
  };

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
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  name="search"
              />
              {/*<Button type="submit" variant="outline-success">Search</Button>*/}
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
                    {events.map(event => (
                        <Col key={event.pk}>
                          <Card>
                            <Card.Img variant="top" src={event.fields.event_image_url} />
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
              </Card.Body>
            </Card>
          </Col>
          <Col xs={3} id="chat-wrapper">
            <Row>
              <Col xs={12}>
              <ListGroup>
                  {activeChats.map(chat => (
                      <ListGroup.Item action key={chat.id} onClick={() => handleSelectChat(chat)}>
                          Chat with {chat.user_name}
                      </ListGroup.Item>
                  ))}
              </ListGroup>

              </Col>
              <Col xs={12}>
                {/* Selected Chat display */}
                {selectedChat && (
                  <Card>
                    <Card.Header as="h5">Chat with {selectedChat.name}</Card.Header>
                    <Card.Body className="chat-body" style={{ overflowY: 'scroll', height: '300px' }}>
                      {/* Display messages here */}
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === 'admin' ? 'admin-message' : 'user-message'}`}>
                          {msg.text}
                        </div>
                      ))}
                      <div ref={messageEndRef} />
                    </Card.Body>
                    <Card.Footer>
                      <Form onSubmit={sendMessage}>
                        <FormControl
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" variant="outline-secondary">Send</Button>
                      </Form>
                    </Card.Footer>
                  </Card>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashRedirect;
