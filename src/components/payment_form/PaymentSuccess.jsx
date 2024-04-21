import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';
function PaymentSuccess() {
    const location = useLocation();
    const payData = location.state;
    console.log(payData)

    return (
        <div className="payment-success-page">
            <div className="payment-success-content">
                <h1>Payment Successful</h1>
                <div>
                    <p><strong>Ticket Type:</strong> {payData.ticket_type}</p>
                    <p><strong>Amount:</strong> ${payData.amount}</p>
                    <p><strong>Transaction ID:</strong> {payData.transaction_id}</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
