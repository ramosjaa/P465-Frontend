import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ChatWidget = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [ws, setWs] = useState(null);

    const handleShow = () => {
        setShow(true);
        fetchChatHistory();
    };
    const handleClose = () => setShow(false);

    // Fetch chat history from the backend
    const fetchChatHistory = async () => {
        const username = sessionStorage.getItem('chatUsername');
        if (username) {
            const response = await axios.get('http://localhost:8000/chat_support/api/messages/by_username/?username=' + encodeURIComponent(username));
            setChatHistory(response.data);
        }
    };

    // Function to generate a unique username
    const generateUsername = () => {
        const prefix = 'Guest';
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `${prefix}${randomNumber}`;
    };

    useEffect(() => {
        const username = sessionStorage.getItem('chatUsername') || generateUsername();
        sessionStorage.setItem('chatUsername', username);

        const websocket = new WebSocket(`ws://localhost:8000/ws/chat/${username}/`);

        websocket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setChatHistory(prevHistory => [...prevHistory, data]);
        };

        websocket.onopen = () => console.log('WebSocket Connected');
        websocket.onerror = error => console.log('WebSocket Error: ', error);
        websocket.onclose = () => console.log('WebSocket Disconnected');

        setWs(websocket);

        return () => websocket.close();
    }, []);

    const handleSendMessage = () => {
        if (ws && message !== "") {
            const msg = {
                text: message,
                sender: sessionStorage.getItem('chatUsername'),
                id: Date.now()  // Using Date.now() to generate a unique ID for the message
            };
    
            // Update chat history optimistically
            setChatHistory(prevHistory => [...prevHistory, msg]);
    
            // Send the message via WebSocket
            ws.send(JSON.stringify(msg));
    
            // Clear the message input field
            setMessage('');
        }
    };
    

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="chat-btn">
                Chat with Us!
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chat Support</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Enter your message:</Form.Label>
                            <Form.Control
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        handleSendMessage();
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </Form.Group>
                        <Button onClick={handleSendMessage} variant="primary">
                            Send
                        </Button>
                    </Form>
                    <div className={`chat-history mt-3`}>
                      {chatHistory.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender.startsWith('Guest') ? 'user-message' : 'admin-message'}`}>
                          {msg.text}
                        </div>
                      ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChatWidget;

