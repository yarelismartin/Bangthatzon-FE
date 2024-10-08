import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { placeOrder } from '../../../../api/OrderData';
import getUsersPaymentTypes from '../../../../api/PaymentTypeData';

export default function Checkout() {
  const [payments, setPayment] = useState([]);
  const [formInput, setFormInput] = useState({});
  const router = useRouter();
  const { userId, orderId } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      paymentTypeId: formInput.paymentTypeId,
    };
    placeOrder(orderId, payload).then(() => {
      router.push(`/users/${userId}/${orderId}/complete`);
    });
  };

  useEffect(() => {
    const getUsersPayments = () => {
      getUsersPaymentTypes(userId).then(setPayment);
    };
    getUsersPayments();
  }, [userId]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[70%] max-w-md p-4 shadow-md rounded-md mt-[100px] bg-gray-100">
        <h3 className="text-center mb-4">Select a Payment Method</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>CARD NUMBER</Form.Label>
            <Form.Select
              name="paymentTypeId"
              onChange={handleChange}
              value={formInput.paymentTypeId}
              required
            >
              <option value="">Select a Payment</option>
              {payments.map((p) => (
                <option value={p.id} key={p.id}>{p.cardNumber}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button type="submit" className="w-full">Place Order</Button>
        </Form>
      </div>
    </div>
  );
}
