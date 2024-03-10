import { GoogleLogin } from "@react-oauth/google";

function SignupOptions({ onNext }) {
    const handleEmailSignup = () => {
      onNext();
    };
  
    const handleGoogleSignup = async () => {
      try {
        const codeResponse = await GoogleLogin();
        const authCode = codeResponse.code;
        // Send the authCode to your backend for authentication and retrieval of user details
        // Update the formData state with the retrieved user details
        onNext();
      } catch (error) {
        console.error('Google login error:', error);
      }
    };
  
    return (
      <div>
        <button className="btn btn-primary btn-lg mb-3" onClick={handleEmailSignup}>
          Sign up with Email
        </button>
        <button className="btn btn-lg btn-google" onClick={handleGoogleSignup}>
          <i className="fab fa-google me-2"></i> Sign up with Google
        </button>
      </div>
    );
  }

  export default SignupOptions;