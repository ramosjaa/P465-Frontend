import React from 'react';
import './Login.css'
import { FaRegUserCircle } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const Login = () => {
    return(
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                {/* <FaRegUserCircle className="icon"/> */}
                <div className="input-box">
                    <input type="text" placeholder="Username" required/>
                </div>
                {/* <IoLockClosedOutline className="icon"/> */}
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                </div>
                <div className="forgot">
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit">Log In</button>

                <div className="register">
                    <p>Don't have an account?</p>
                    <a href="#">Register</a>
                    <br/>
                </div>
            </form>
        </div>
    );
};

export default Login;