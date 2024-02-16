import React from 'react';
import './Register.css'; // Assuming you have a separate CSS file for registration styles
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const Register = () => {
    return(
        <div className="wrapper">
            <form action="">
                <h1>Register</h1>
                {/* <FaRegUserCircle className="icon"/> */}
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                </div>
                {/* <IoLockClosedOutline className="icon"/> */}
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                </div>
                {/* Add additional registration fields here as needed */}
                <div className="input-box">
                    <input type="email" placeholder="Email" required/>
                </div>

                <button type="submit">Register</button>

                <div className="login">
                    <p>Already have an account?</p>
                    <a href="#">Login</a>
                    <br/>
                </div>
            </form>
        </div>
    );
};

export default Register;