import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// google auth client id
const clientId = '1007116342844-hbm6up78s4ooss7bk2eksthhqgn6hu4g.apps.googleusercontent.com';

// have some variable here that is the payload sent to the googlesign up api or the vanilla api. 
// both endpoints use payloads structured likes this... 
// const payload = {
//     firstName: formData.firstName,
//     lastName: formData.lastName,
//     username: formData.username,
//     email: formData.email,
//     password: formData.password,
//     phoneNumber: formData.phoneNumber,
//     spotifyUsername: formData.spotifyUsername
// };

function SignupOptions({ formData, setFormData, onNext, signupOption, setSignUpOption}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleEmailSignup = () => {
    // set the sign up option to be "Email"
    setSignUpOption("Email");
    // Perform form validation
    if ('' === formData.password) {
      alert("Must add a password")
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onNext({ email, password });
  };

  const clickedGoogleSignUp = async (credentialResponse) => {
    // Set the sign-up option to "Google"
    setSignUpOption("Google");
  
    try {
      // Send the credential to your backend API
      const response = await fetch('https://p465-backend-latest-1.onrender.com/auth/google_email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
  
      if (response.ok) {
        // Handle the response from your backend API
        const data = await response.json();
        const { email } = data;
        console.log("email forom CLCIKC GOOG" + email)
        // Set the email to the email found from the async variable
        setFormData((prevFormData) => ({
          ...prevFormData,
          email,
          password: 'None',
        }));
  
        // Use the 'None' password to identify that a user used Google sign-up within our API
        // Then use onNext to move forward in the sign-up process
        onNext({ email, password: 'None' });
      } else {
        // Handle error if the API request was unsuccessful
        console.error('Google Sign-Up API Error:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Google Sign-Up Error:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
        <div>
          <div className="form-group">
            <label htmlFor="password">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
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

            <button className="btn btn-primary btn-lg mb-3" onClick={handleEmailSignup}>
                Sign up with Email
            </button>

            <h1> OR...</h1>
            <h2>Sign up with Google</h2>

            <GoogleLogin
                    onSuccess={clickedGoogleSignUp}
                    onError={(error) => {
                    console.error('Google Sign-In Error:', error);
                    }}
            />
        </div>
    </GoogleOAuthProvider>
  );
}

export default SignupOptions;