import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import SignupForm from './components/register/register.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client'
import Login from './components/login/Login.jsx';
import LandingPage from './components/landingpage/landingpage.jsx';


function App() {
  return (
    <div >
        <BrowserRouter>
            <Routes>
                <Route path="" element={<LandingPage />}> </Route>
                <Route path="/login" element={<Login />}> </Route>
                <Route  path="/signup" element={<SignupForm />}></Route>
            </Routes>
        </BrowserRouter>
    </div>  
  );
}
const container = document.getElementById("root");
export default App;