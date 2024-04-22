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
        const response = await fetch('https://p465-backend-latest-1.onrender.com/chat_support/api/chats/');
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
    fetchAllChats();
    console.log("Selected chat object:", chat);  // Log to verify the structure of the chat object
    if (!chat || !chat.session_id || !chat.messages) {
        console.error("Selected chat is incomplete or lacks required properties (session_id or messages):", chat);
        return;  // Prevent further execution if the chat object is missing necessary data
    }
    
    setSelectedChat(chat);
    setChatMessages(chat.messages); // Directly set messages from the passed chat object

    // Check if a WebSocket connection already exists, if so, close it before opening a new one
    if (ws) {
        ws.close(); // Close the existing WebSocket connection if open
    }

    // Establish a new WebSocket connection for the selected chat
    const newWs = new WebSocket(`wss://p465-backend-latest-1.onrender.com/ws/chat/${chat.session_id}/`);
    newWs.onmessage = event => {
        const messageData = JSON.parse(event.data);
        console.log("Received WebSocket message:", messageData);
        setChatMessages(prev => [...prev, messageData]); // Append new messages received via WebSocket
    };
    setWs(newWs); // Update WebSocket connection state
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
      const response = await fetch(`https://p465-backend-latest-1.onrender.com/events/search_events/?q=${query}`);
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
        <Col xs={3} className="bg-dark border-end" id="sidebar-wrapper">
          <ListGroup>
            {activeChats.map(chat => (
              <ListGroup.Item
                action
                key={chat.id}
                onClick={() => handleSelectChat(chat)}
                className={selectedChat && chat.session_id === selectedChat.session_id ? "active-chat" : ""}
              >
                Chat with {chat.user_name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xs={9} id="page-content-wrapper">
        {selectedChat && (
  <Card>
    <Card.Header as="h5">Chat with {selectedChat.user_name}</Card.Header>
    <Card.Body className="chat-body">
      {chatMessages.length > 0 ? (
        chatMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === 'admin' ? 'user-message' : 'admin-message'}`}>
            {msg.text}
          </div>
        ))
      ) : (
        <p>No messages to display.</p>
      )}
      <div ref={messageEndRef} />
    </Card.Body>
    <Card.Footer>
      <Form onSubmit={sendMessage}>
        <InputGroup>
          <FormControl
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" variant="outline-secondary">Send</Button>
        </InputGroup>
      </Form>
    </Card.Footer>
  </Card>
)}
        </Col>
      </Row>
    </Container>
  </>
);
};

export default AdminDashRedirect;
