/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getOrderSummary } from '../../../../api/OrderData';

export default function Complete() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState({});

  const getOrderComplete = () => {
    getOrderSummary(orderId).then(setOrder);
  };
  useEffect(() => {
    getOrderComplete();
  }, [orderId]);

  return (
    <div>
      <h1>Complete!</h1>
      <h4>Thank you</h4>
      <h3>Your order has been received.</h3>
      <p>Order #{orderId}</p>
      {order.products?.map((p) => (
        <Card.Img variant="top" src={p.image} />

      ))}
      <div>
        <Button onClick={() => router.push(`/users/${order.userId}/order_history`)}>Go to Order History</Button>
        <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
      </div>
    </div>
  );
}
