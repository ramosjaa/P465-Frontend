import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './Login.css'
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

// google auth client id
const clientId = '1007116342844-hbm6up78s4ooss7bk2eksthhqgn6hu4g.apps.googleusercontent.com';

function LoginForm() {

    //google authentication and sign in
    const handleGoogleSignIn = async (credentialResponse) => {
        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/google_signin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: credentialResponse.credential }),
            });

      if (response.ok) {

        const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/google_email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ credential: credentialResponse.credential }),
        });


        const data = await response.json();
        const { email } = data;
        const { type } = 1
        console.log('Login Success:', data);

        const userData = {
          email: email,
          type: type
        };

        login(userData); // pass userData into login
        navigate('/dashboard'); // navigate to dashboard
      }
    } catch (error) {
      console.error('Request Failed:', error);
      alert('An error occurred. Please try again.');
    }
  };


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
            email: loginData.email,
            password: loginData.password,
        };

        try {
            //const response = await fetch('https://p465-backend-latest.onrender.com/auth/login/', {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login Success:', data);

                const userData = {
                    email: loginData.email,
                    type: 1
                };

                //post-login logic
                login(userData) //user logged in, update AuthContext
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
        <GoogleOAuthProvider clientId={clientId}>
            <div className="home-page">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-9">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">Login to Your Account</p>

                                            <form className='row d-flex' onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="Email" className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            value={loginData.email}
                                                            onChange={handleChange}
                                                            placeholder="Email"
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

                                                <div className="d-flex justify-content-center mx-5 mb-3 mb-lg-4">
                                                    <button className="btn btn-primary btn-lg" type="submit">Login</button>

                                                    <div className="container">
                                                        <div className="row d-flex">
                                                            <Link to="/password-reset">Forgot password?</Link>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="text-center">
                                                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                                                    <p>Or continue with</p>
                                                    <GoogleLogin
                                                        onSuccess={handleGoogleSignIn}
                                                        onError={(error) => {
                                                            console.error('Google Sign-In Error:', error);
                                                        }}
                                                    />
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
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginForm;