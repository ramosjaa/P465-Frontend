import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from "@react-oauth/google";

const clientId = "547487030944-02a2eagkkl5q4ppo5klpme85ioj0pa73.apps.googleusercontent.com";

export const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <GoogleOAuthProvider clientId={clientId}>
          <App />
      </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
