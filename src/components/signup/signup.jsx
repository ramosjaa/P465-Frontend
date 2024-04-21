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

  const fetchUserId = async (email) => {
    try {
      console.log("Email in fetch: ", email);
      const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/get_user_id/', {
      //const response = await fetch('http://localhost:8000/auth/get_user_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();
      if (response.ok) {
        //setId(data.id);
        //console.log("Id is now: ", id);
        return data.id;
      } else {
        //setId(null);
        console.error("Request failed");
        alert("Fetch error 1 ocurred. Please try again.");
        return null;
      }
    } catch (error) {
      console.error('Request Failed:', error);
      alert('Fetch error 2 occurred. Please try again.');
      return null;
    }
  }

  // handling the state of form viewable for user
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const [id, setId] = useState(-1);

  const renderStep = async () => {
    switch (step) {
      case 1:
        return <SignupOptions formData={formData} setFormData={setFormData} onNext={handleNext} signupOption={signUpOption} setSignUpOption={setSignUpOption} />;
      case 2:
        const getId = await fetchUserId(formData.email);
        setId(getId);
        return <SignupDetails formData={formData} setFormData={setFormData} onNext={handleNext} onPrevious={handlePrevious} signUpOption={signUpOption} />;
      case 3:
        // const id = await fetchUserId(formData.email);
        const userData = {
          id: id,
          email: formData.email,
          type: 1
        };

        login(userData);
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