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

function SignupOptions({ onNext }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignup = () => {
    // store the email and password and have it saved and 
    onNext({ email, password });
  };

  const clickedGoogleSignUp = async (credentialResponse) => {
    // store the users google email and eventually use the google sign up api for the backend
    try {
        const response = await fetch('http://localhost:8000/auth/google-signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Google Sign-Up Success:', data);
        // post-signup logic

        

      } else {
        console.error('Google Sign-Up Error:', data.error);
        alert('Google Sign-Up Failed: ' + data.error);
      }
    } catch (error) {
      console.error('Request Failed:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button className="btn btn-primary btn-lg mb-3" onClick={handleEmailSignup}>
                Sign up with Email
            </button>

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