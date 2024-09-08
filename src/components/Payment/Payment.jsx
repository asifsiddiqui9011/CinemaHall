import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'
  const [upiId, setUpiId] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setErrorMessage(null); // Reset error message when switching methods
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    let paymentIntent;
    if (paymentMethod === 'card') {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      paymentIntent = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Amount in cents (e.g., $10.00)
      }).then((res) => res.json());

      const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
        payment_method: pm.id,
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        setErrorMessage('Payment successful!');
      }
    } else if (paymentMethod === 'upi') {
      paymentIntent = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Amount in cents (e.g., $10.00)
      }).then((res) => res.json());

      const { error: confirmError } = await stripe.confirmUpiPayment(paymentIntent.clientSecret, {
        payment_method_data: {
          type: 'upi',
          upi: {
            vpa: upiId,
          },
        },
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else {
        setErrorMessage('Payment successful!');
      }
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h2>Payment Details</h2>

      <div className="payment-methods">
        <button
          type="button"
          className={paymentMethod === 'card' ? 'active' : ''}
          onClick={() => handlePaymentMethodChange('card')}
        >
          Card
        </button>
        <button
          type="button"
          className={paymentMethod === 'upi' ? 'active' : ''}
          onClick={() => handlePaymentMethodChange('upi')}
        >
          UPI
        </button>
      </div>

      {paymentMethod === 'card' && (
        <CardElement className="StripeElement" />
      )}

      {paymentMethod === 'upi' && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          className="upi-input"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
        />
      )}

      <button type="submit" className="pay-button" disabled={!stripe}>
        Pay
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default Payment;
