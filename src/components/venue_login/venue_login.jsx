import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './venue_login.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { GoogleLogin } from "@react-oauth/google";

function VenueLoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate(); //navigation for pages
    const { isAuthenticated, login } = useContext(AuthContext); //user's login session

    useEffect(() => {
        document.title = 'Venue Login | RhythmReserve';
    }, []);

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated) {
            navigate('/vdashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payloadData = new FormData();
        payloadData.append('email', formData.email);
        payloadData.append('password', formData.password);

        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/venue_login/', {
                method: 'POST',
                body: payloadData
            });

            console.log(JSON.stringify(payloadData));

            const data = await response.json();
            if (response.ok) {
                console.log('Login Success:', data);
                //post-signup logic
                login({email: formData.email, type: 2}) //user logged in, update AuthContext
                navigate('/vdashboard') //navigate to dashboard
            } else {
                console.error('Login Error:', data.error);
                alert('Login Failed: ' + data.error);
            }
        } catch (error) {
            console.error('Request Failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const googleLogin = GoogleLogin({
        onSuccess: async (codeResponse) => {
            console.log(codeResponse);

            // Extract the code from the response
            const authCode = codeResponse.code;

        },
        onError: (error) => {
            console.error('Google login error:', error);
        },
        flow: 'auth-code',
    }
    );


    return (
        <div>
            <div className="home-page">
                <section className="container-lg min-vh-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-10 col-xl-9">
                                <div className="card text-black" style={{ borderRadius: "25px" }}>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                                <p className="text-center h3 flex-row fw-bold mb-4 mx-1 mx-md-4 mt-4">Login to Your Venue Account</p>

                                                <form className='row d-flex' onSubmit={handleSubmit}>

                                                    <div className="d-flex flex-row align-items-center mb-3">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label htmlFor="Email" className="form-label">Email</label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                className="form-control"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                placeholder="Email"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex flex-row align-items-center mb-3">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <label htmlFor="Password"
                                                                className="form-label">Password</label>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                name="password"
                                                                className="form-control"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                placeholder="Password"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-3">
                                                        <button className="btn btn-primary btn-lg" type="submit"
                                                            onClick={() => console.log('Form Submitted', formData)}>Login
                                                        </button>
                                                    </div>

                                                    <div className="container">
                                                        <div className="row d-flex">
                                                            <div className="col-md-8">
                                                                <p>Don't have an account?</p>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <a href="/vsignup">Signup</a>
                                                            </div>
                                                        </div>
                                                    </div>                                                   
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default VenueLoginForm;