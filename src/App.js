import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import SignupForm from './components/register/register.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div >
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<Login />}> </Route>*/}
                <Route  path="/signup" element={<SignupForm />}></Route>
            </Routes>
        </BrowserRouter>
    </div>  
  );
}
const container = document.getElementById("root");
export default App;