import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './venue_signup.css';
import { GoogleLogin } from "@react-oauth/google";

function VenueSignupForm() {
    const [formData, setFormData] = useState({
        venueName: '',
        image: '',
        location: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const navigate = useNavigate(); //navigation for pages
    const { isAuthenticated, login } = useContext(AuthContext); //user's login session

    useEffect(() => {
        document.title = 'Venue Sign Up | RhythmReserve';
    }, []);

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated) {
            navigate('/vdashboard');
        }
    }, [isAuthenticated, navigate]);

    const [selectedImage, setSelectedImage] = useState(null);

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
        payloadData.append('venueName', formData.venueName);
        payloadData.append('location', formData.location);
        payloadData.append('email', formData.email);
        payloadData.append('password', formData.password);
        payloadData.append('image', selectedImage);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!formData.agreeTerms) {
            alert("You must agree to the terms and conditions!");
            return;
        }

        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/venue_signup/', {
                method: 'POST',
                body: payloadData, // Send formData instead of JSON
            });
            
            console.log(JSON.stringify(payloadData));

            const data = await response.json();
            if (response.ok) {
                console.log('Registration Success:', data);
                //post-signup logic
                login({email: formData.email, type: 2}) //user logged in, update AuthContext
                navigate('/vdashboard') //navigate to dashboard
            } else {
                console.error('Registration Error:', data.error);
                alert('Registration Failed: ' + data.error);
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
        <div className="home-page">
            <section className="container-lg min-vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-9">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h3 flex-row fw-bold mb-4 mx-1 mx-md-4 mt-4">Create a Rhythm
                                                Reserve Venue Account</p>

                                            <form className='row d-flex' onSubmit={handleSubmit}>
                                                {selectedImage && (
                                                    <div>
                                                        <img
                                                            alt="not found"
                                                            width={"100px"}
                                                            src={URL.createObjectURL(selectedImage)}
                                                        />
                                                        <br />
                                                        <button onClick={() => {
                                                            setSelectedImage(null);
                                                        }}>Remove</button>
                                                    </div>
                                                )}

                                                <br />
                                                <br />

                                                <input
                                                    type="file"
                                                    name="image"
                                                    onChange={(event) => {
                                                        console.log(event.target.files[0]);
                                                        setSelectedImage(event.target.files[0]);
                                                    }}
                                                />

                                                <div className="d-flex flex-row align-items-center mb-3 half-width-inputs">
                                                    {/*<div className="d-flex flex-row align-items-center mb-4">*/}
                                                    <div className="form-outline flex-fill mb-0 me-3">
                                                        <label htmlFor="VenueName" className="form-label">Venue Name</label>
                                                        <input
                                                            type="text"
                                                            id="venueName"
                                                            name="venueName"
                                                            className="form-control"
                                                            value={formData.venueName}
                                                            onChange={handleChange}
                                                            placeholder="Venue Name"
                                                            required
                                                        />
                                                    </div>
                                                    {/*</div>*/}

                                                    {/*<div className="d-flex flex-row align-items-center mb-4">*/}
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="Location" className="form-label">Location</label>
                                                        <input
                                                            type="text"
                                                            id="location"
                                                            name="location"
                                                            className="form-control"
                                                            value={formData.location}
                                                            onChange={handleChange}
                                                            placeholder="Location"
                                                            required
                                                        />
                                                    </div>
                                                    {/*</div>*/}
                                                </div>

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

                                                <div className="d-flex flex-row align-items-center mb-3">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="Re-enter password" className="form-label">Re-enter
                                                            password</label>
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            className="form-control"
                                                            value={formData.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder="Re-enter password"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-md-start mx-2 mb-3">
                                                    <input
                                                        className="form-check-input small me-2"
                                                        type="checkbox"
                                                        id="agreeTerms"
                                                        name="agreeTerms"
                                                        checked={formData.agreeTerms}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label small" htmlFor="agreeTerms">
                                                        I agree to the Rhythm Reserve User Agreement, Privacy Policy,
                                                        and Non-Discrimination Policy.
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-3">
                                                    <button className="btn btn-primary btn-lg" type="submit"
                                                        onClick={() => console.log('Form Submitted', formData)}>Create
                                                        account
                                                    </button>
                                                </div>

                                                <div className="container">
                                                    <div className="row d-flex">
                                                        <div className="col-md-8">
                                                            <p>Already have an account?</p>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <a href="/vlogin">Login</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-center mb-2">Or continue with</p>
                                                <div className="d-flex justify-content-center">
                                                    <button className="btn btn-lg btn-google me-2"
                                                        onClick={googleLogin}>
                                                        <i className="fab fa-google me-2"></i> Google
                                                    </button>
                                                    <button className="btn btn-lg btn-facebook"
                                                        onClick={() => console.log('Continue with Facebook')}>
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

        // </section>
        </div>
    );
}

export default VenueSignupForm;