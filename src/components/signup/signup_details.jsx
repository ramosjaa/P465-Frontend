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
      // Send the formData to your backend for user registration
      // Handle the response and navigate to the appropriate page
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* Render input fields for first name, last name, phone number, Spotify username */}
        {/* Render checkbox for agreeing to the policy */}
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