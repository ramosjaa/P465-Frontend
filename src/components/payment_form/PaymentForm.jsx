import React from 'react';

const PaymentForm = () => {
    return (
        <div className="container mt-5">
            <h2>Payment Details</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                    <input type="text" className="form-control" id="cardNumber" placeholder="Enter your card number" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cardName" className="form-label">Cardholder Name</label>
                    <input type="text" className="form-control" id="cardName" placeholder="Enter your name" />
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                        <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" />
                    </div>
                    <div className="col">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input type="text" className="form-control" id="cvv" placeholder="CVV" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit Payment</button>
            </form>
        </div>
    );
};

export default PaymentForm;