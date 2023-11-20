import { Helmet } from 'react-helmet-async';
import { Form, Button } from 'react-bootstrap';
import { CheckcoutSteps } from '../components/CheckcoutSteps';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckcoutSteps step1 step2 step3></CheckcoutSteps>

      <div className="container small-container">
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              label="PayPal"
              name="PayPal"
              id="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              label="Stripe"
              name="Stripe"
              id="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
