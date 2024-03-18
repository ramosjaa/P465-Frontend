function SignupDetails({ formData, setFormData, onNext, onPrevious }) {
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Perform form validation
      if ('' === formData.password) {
        alert("Must add a password")
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (!formData.agreeTerms) {
        alert("You must agree to the terms and conditions!");
        return;
      }
  
      // Send the formData to your backend for user registration
      try {
        console.log(formData)
        const response = await fetch('http://localhost:8000/auth/signup/', {
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

      
    };
  
    return (
      <form onSubmit={handleSubmit}>
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