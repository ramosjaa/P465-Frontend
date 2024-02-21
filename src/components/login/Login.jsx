import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App'; 
import './Login.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

function LoginForm() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate(); //navigation for pages
    const { isAuthenticated, login } = useContext(AuthContext); //user's login session

    useEffect(() => {
        document.title = 'Login | RhythmReserve';
    }, []);

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevLoginData => ({
            ...prevLoginData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            usernameOrEmail: loginData.usernameOrEmail,
            password: loginData.password,
        };

        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login Success:', data);
                //post-login logic
                login() //user logged in, update AuthContext
                navigate('/dashboard') //navigate to dashboard
            } else {
                console.error('Login Error:', data.error);
                alert('Login Failed: ' + data.error);
            }
        } catch (error) {
            console.error('Request Failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-10 col-xl-9">
                    <div className="card text-black" style={{borderRadius: "25px"}}>
                        <div className="card-body p-md-5">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">Login to Your Account</p>

                                    <form className='row d-flex' onSubmit={handleSubmit}>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
                                                <input
                                                    type="text"
                                                    id="usernameOrEmail"
                                                    name="usernameOrEmail"
                                                    className="form-control"
                                                    value={loginData.usernameOrEmail}
                                                    onChange={handleChange}
                                                    placeholder="Username or Email"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label htmlFor="Password" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={loginData.password}
                                                    onChange={handleChange}
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button className="btn btn-primary btn-lg" type="submit">Login</button>
                                        </div>

                                        <div className="text-center">
                                            <p>Don't have an account? <a href="/signup">Signup</a></p>
                                            <p>Or continue with</p>
                                            <button className="btn btn-lg btn-google me-2" onClick={() => console.log('Continue with Google')}>
                                                <i className="fab fa-google me-2"></i> Google
                                            </button>
                                            <button className="btn btn-lg btn-facebook" onClick={() => console.log('Continue with Facebook')}>
                                                <i className="fab fa-facebook me-2"></i> Facebook
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;