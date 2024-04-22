import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';
function PaymentSuccess() {
    const location = useLocation();
    const payData = location.state;
    console.log(payData)

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/dashboard");
    }

    return (
        <div className="payment-success-page">
            <div className="payment-success-content">
                <button onClick={handleBack} className="btn btn-primary">Back</button>
                <br/>
                <br/>
                <h1>Payment Successful</h1>
                <div>
                    <p><strong>Event Name:</strong> {payData.event_name}</p>
                    <p><strong>Event Time:</strong> {payData.event_time}</p>
                    <p><strong>Ticket Type:</strong> {payData.ticket_type}</p>
                    <p><strong>Amount:</strong> ${payData.amount}</p>
                    <p><strong>Transaction ID:</strong> {payData.transaction_id}</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
