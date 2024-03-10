import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import './signup.css';
import { GoogleLogin } from "@react-oauth/google";
import SignupOptions from './signup_options';
import SignupDetails from './signup_details';

function SignupForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        spotifyUsername: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    // handling the state of form viewable for user
    const handleNext = () => {
        setStep(step + 1);
      };
    
      const handlePrevious = () => {
        setStep(step - 1);
      };
    
      const renderStep = () => {
        switch (step) {
          case 1:
            return <SignupOptions onNext={handleNext} />;
          case 2:
            return <SignupDetails formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} />;
          default:
            return null;
        }
    }

    const navigate = useNavigate(); //navigation for pages
    const { isAuthenticated, login } = useContext(AuthContext); //user's login session

    useEffect(() => {
        document.title = 'Sign Up | RhythmReserve';
    }, []);

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated) {
            navigate('/dashboard');
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!formData.agreeTerms) {
            alert("You must agree to the terms and conditions!");
            return;
        }

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            spotifyUsername: formData.spotifyUsername
        };

        try {
            const response = await fetch('http://localhost:8000/auth/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration Success:', data);
                //post-signup logic
                login() //user logged in, update AuthContext
                navigate('/dashboard') //navigate to dashboard
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
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-9">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <p className="text-center h3 flex-row fw-bold mb-4 mx-1 mx-md-4 mt-4">
                          Create a Rhythm Reserve Account
                        </p>
                        {renderStep()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SignupForm;