function SignupDetails({ formData, setFormData, onNext, onPrevious, signUpOption }) {
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.agreeTerms) {
        alert("You must agree to the terms and conditions!");
        return;
      }
  
      // determine whicih sign up option the user chose and send to backend api depending on that
      // if 'Google' send the form data via POST to https://p465-backend-latest-1.onrender.com/auth/google_signup/
      //if 'Email' send the form data via POST to https://p465-backend-latest-1.onrender.com/auth/signup/
      // Send the formData to your backend for user registration
      // finally, sign the user in and redirect them to the dashboard with ......
      //   useEffect(() => {
      //     // Redirect to dashboard if already logged in
      //     if (isAuthenticated) {
      //         navigate('/dashboard');
      //     }
      // }, [isAuthenticated, navigate]);
      try {
        console.log(JSON.stringify(formData, null, 2));
        console.log(signUpOption)
        let url;
        if (signUpOption === 'Google') {
          url = 'https://p465-backend-latest-1.onrender.com/auth/google_signup/';
        } else if (signUpOption === 'Email') {
          url = 'https://p465-backend-latest-1.onrender.com/auth/signup/';
        } else {
          throw new Error('Invalid sign-up option');
        }
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Registration Success:', data);
          // Handle the response and navigate to the appropriate page
          onNext();
        } else {
          console.error('Registration Error:', data.error);
          alert('Registration Failed: ' + data.error);
        }
      } catch (error) {
        console.error('Request Failed:', error);
        alert('An error occurred. Please try again.');
      }
      // move the user to the login page to sign in with their newly created account!
      onNext();
      
    };
  
    return (
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="spotifyUsername">Spotify Username</label>
          <input
            type="text"
            id="spotifyUsername"
            name="spotifyUsername"
            className="form-control"
            value={formData.spotifyUsername}
            onChange={handleChange}
            required
          />
        </div>
  
        {/* Render checkbox for agreeing to the policy */}
        <div className="form-check">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            className="form-check-input"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms" className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>
  
        <button className="btn btn-secondary btn-lg me-3" onClick={onPrevious}>
          Previous
        </button>
        <button className="btn btn-primary btn-lg" type="submit">
          Sign up
        </button>
      </form>
    );
  }
  
  export default SignupDetails;