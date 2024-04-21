import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './PasswordResetForm.css';

function PasswordResetForm() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [resetCode, setResetCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/password_reset_request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Please check your email for the verification code.'); // pop up to check email
                setStep(2); // move to code verification step
            } else {
                alert('Error requesting password reset. Please try again.');
            }
        } catch (error) {
            console.error('Request Failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/verify_reset_code/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, resetCode }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Code verified. You can now reset your password.');
                setStep(3); // Move to resetting password if correct code
            } else {
                alert(data.error || 'Error verifying code. Please try again.');
            }
        } catch (error) {
            console.error('Verification Failed:', error);
            alert('An error occurred. Please try again.');
        }
    };


    const handleResetSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/password_reset_post/', { // Corrected URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send the email and new password
            });

            if (response.ok) {
                alert('Password reset successfully. Please login with your new password.');
                navigate('/login'); // Redirect to login page
            } else {
                alert('Error resetting password. Please try again.');
            }
        } catch (error) {
            console.error('Reset Failed:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (step === 1) { //enter email
        return (
            <div className="home-page">
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                        <div className="card-body p-md-5">
                            <div>
                                <h2>Reset Password</h2>
                                <form onSubmit={handleEmailSubmit} className=" row d-flex align-items-center">
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg">Send Reset Code</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (step === 2) { //enter code
        return (
            <div className="home-page">
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                        <div className="card-body p-md-5">
                            <div>
                                <h2>Enter Code</h2>
                                <form onSubmit={handleCodeSubmit} className="d-flex flex-column align-items-center">
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="text"
                                            value={resetCode}
                                            onChange={(e) => setResetCode(e.target.value)}
                                            placeholder="Code"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn">Submit Code</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    } else { //enter new password
        return (
            <div className="home-page">
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <div className="card text-black" style={{ borderRadius: "25px" }}>
                        <div className="card-body p-md-5">
                            <h2>Enter New Password</h2>
                            <form onSubmit={handleResetSubmit} className="d-flex flex-column align-items-center">
                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        type="text"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                </div>

                                <div className="form-outline flex-fill mb-0">
                                    <input
                                        type="text"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordResetForm;