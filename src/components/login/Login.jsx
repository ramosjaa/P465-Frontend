import React, { useState } from 'react';
import './Login.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission behavior

        // fetch API to send data to backend
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login/', { // django server (localhost for now)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                // handle successful login here (e.g., redirect to another page)
            } else {
                console.error('Login failed:', data.error);
                // handle login failure here (e.g., show error message)
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="forgot">
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Log In</button>
                <div className="register">
                    <p>Don't have an account?</p>
                    <a href="#">Register</a>
                    <br/>
                </div>
            </form>
        </div>
    );
};

export default Login;