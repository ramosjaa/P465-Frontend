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
    const [signUpOption, setSignUpOption] = useState('')

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
            return <SignupOptions formData={formData} setFormData={setFormData} onNext={handleNext} signupOption={signUpOption} setSignUpOption={setSignUpOption} />;
          case 2:
            return <SignupDetails formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} signUpOption={signUpOption}/>;
          case 3:
            login({email: formData.email, type: 1})
            navigate('/dashboard'); // navigate to dashboard
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