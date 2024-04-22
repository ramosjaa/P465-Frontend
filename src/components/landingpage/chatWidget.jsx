import "./landingpage.css";
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ChatWidget = () => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [ws, setWs] = useState(null);
    const messageEndRef = useRef(null);


    const handleShow = async () => {
        setShow(true);
        const sessionID = await ensureSession();
        connectWebSocket(sessionID);
        fetchChatHistory(sessionID);
    };
    const handleClose = () => setShow(false);

    // Ensure session is created or retrieved
    const ensureSession = async () => {
        let sessionID = sessionStorage.getItem('sessionID');
        let username = sessionStorage.getItem('chatUsername');
        if (!sessionID || !username) {
            if (!username) {
                username = generateUsername(); // Generate username if not exists
                sessionStorage.setItem('chatUsername', username); // Store it for later use
                console.log("New username generated and stored:", username);
            }
            const response = await axios.post('https://p465-backend-latest-1.onrender.com/chat_support/api/sessions/', { user_name: username });
            sessionID = response.data.id;
            sessionStorage.setItem('sessionID', sessionID);
            console.log("New session created and stored:", sessionID);
        } else {
            console.log("Session and username retrieved from sessionStorage:", sessionID, username);
        }
        return sessionID;
    };
    
    

    // Connect to WebSocket
    const connectWebSocket = (sessionID) => {
        const websocket = new WebSocket(`wss://p465-backend-latest-1.onrender.com/ws/chat/${sessionID}/`);

        websocket.onmessage = function(event) {
            const data = JSON.parse(event.data);
            setChatHistory(prevHistory => [...prevHistory, data]);
        };

        websocket.onopen = () => console.log('WebSocket Connected');
        websocket.onerror = error => console.log('WebSocket Error: ', error);
        websocket.onclose = () => console.log('WebSocket Disconnected');

        setWs(websocket);
    };

    // Fetch chat history from the backend
    const fetchChatHistory = async (sessionID) => {
        const response = await axios.get(`https://p465-backend-latest-1.onrender.com/chat_support/api/messages/session/${sessionID}`);
        setChatHistory(response.data);
    };

    // Function to generate a unique username
    const generateUsername = () => {
        const prefix = 'Guest';
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `${prefix}${randomNumber}`;
    };

    useEffect(() => {
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [ws]);

    useEffect(() => {
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [chatHistory]);
      

    const handleSendMessage = () => {
        const username = sessionStorage.getItem('chatUsername'); // Retrieve the username
        if (ws && message !== "" && username) {
            const msg = {
                text: message,
                sender: username,
                // Optionally, you might want to include a temporary ID or timestamp
                tempId: Date.now()
            };
    
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
                    <div
                        key={index}
                        className={`chat-message ${msg.sender.startsWith('Guest') ? 'user-message' : 'admin-message'}`}
                        ref={index === chatHistory.length - 1 ? messageEndRef : null} // Add ref to the last message
                      >
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
