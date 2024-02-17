import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';


function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your signup logic here
        console.log(formData);
    };


    return (
        // <section className="container-lg min-vh-100" style={{backgroundColor: "#eee"}}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{borderRadius: "25px"}}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create a Rhythm
                                            Reserve Account</p>

                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label htmlFor="FirstName" className="form-label">First name</label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="form-control"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        placeholder="First name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label htmlFor="LastName" className="form-label">Last name</label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className="form-control"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Last name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label htmlFor="PhoneNumber" className="form-label">Phone
                                                        number</label>
                                                    <input
                                                        type="tel"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        className="form-control"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        placeholder="Phone number"
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
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
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

                                            <div className="form-check d-flex justify-content-md-start mb-5">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    id="agreeTerms"
                                                    name="agreeTerms"
                                                    checked={formData.agreeTerms}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor="agreeTerms">
                                                    I agree to the Rhythm Reserve User Agreement, Privacy Policy, and
                                                    Non-Discrimination Policy.
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button className="btn btn-primary btn-lg" type="submit"
                                                        onClick={() => console.log('Form Submitted', formData)}>Create
                                                    account
                                                </button>
                                            </div>
                                            <p className="text-center">Or continue with</p>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-lg btn-google me-2"
                                                        onClick={() => console.log('Continue with Google')}>
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
    );
}

export default SignupForm;