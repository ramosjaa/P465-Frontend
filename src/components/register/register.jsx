import React, { useState } from 'react';
import './Register.css';
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const Register = () => {
    // State for form fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register/', { // django server (localhost for now)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();
            if (response.ok) {
                // handle success
                console.log('Registration successful:', data);
                // redirect or manage state as needed
            } else {
                // handle errors
                console.error('Registration failed:', data.error);
            }
        } catch (error) {
            console.error('Request failed:', error);
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
                <div className="login">
                    <p>Already have an account?</p>
                    <a href="#">Login</a>
                    <br/>
                </div>
            </form>
        </div>
    );
};

export default Register;