import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './PaymentForm.css';
import {useLocation, useNavigate} from 'react-router-dom';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focused, setFocused] = useState('');
    const location = useLocation();
    const ticketType = location.state?.ticketType;
    const priceDetails=location.state;
    const navigate = useNavigate();
    const sessionData = sessionStorage.getItem('user');

    const userData = JSON.parse(sessionData);
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        if (!priceDetails || !priceDetails.type) {
            alert('Please select a ticket type before proceeding.');
            return; // Stop the function execution here
        }
        console.log(userData.email)
        const paymentData = {
            status: "Success",
            event_name: priceDetails.event_name,
            event_time: priceDetails.event_time,
            amount: priceDetails.price,
            type: priceDetails.type, // Include the ticket type
            user_email: userData.email,
        };

        try {
            const response = await fetch('https://p465-backend-latest-1.onrender.com/bookings/payment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });

            console.log("pay details", paymentData);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("Response:", responseData.data);
            // Redirect to a payment success page and pass response data
            navigate("/payment-success", { state: responseData.data});
        } catch (error) {
            console.error('Payment failed:', error);
            // Handle errors here (e.g., display an error message)
        }// Handle errors here (e.g., display an error message)
    };

    return (
        <div className="mt-5">
            <Cards
                number={cardNumber}
                name={cardName}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
            />
            <form className="payment-form mt-5 mb-3 mx-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="tel"
                        name="cardNumber"
                        className="form-control"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        onFocus={e => setFocused(e.target.name)}
                        pattern="\d*"
                        maxLength="16"
                        title="Card number should be 16 digits"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        onFocus={e => setFocused(e.target.name)}
                        pattern="[A-Za-z\s]+"
                        maxLength="15"
                        title="Name should be at least 2 characters"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="expiry"
                        className="form-control"
                        placeholder="Expiry Date"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        onFocus={e => setFocused(e.target.name)}
                        pattern="\d{2}/\d{2}"
                        maxLength="5"
                        title="Expiry date should be in the format MM/YY"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="cvc"
                        className="form-control"
                        placeholder="CVC"
                        value={cvc}
                        onChange={e => setCvc(e.target.value)}
                        onFocus={e => setFocused(e.target.name)}
                        pattern="\d{3,4}"
                        maxLength="4"
                        title="CVC should be 3 or 4 digits"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentForm;
