import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { getOrderSummary } from '../../api/OrderData';

export default function OrderDetail() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    let isMounted = true; // Add this variable to track component mount status

    const getOrderDeatil = () => {
      getOrderSummary(orderId).then((orderData) => {
        if (isMounted) { // Only update state if component is still mounted
          setOrder(orderData);
        }
      });
    };

    getOrderDeatil();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const formattedDate = new Date(order.purchaseDate).toLocaleDateString();

  return (
    <div>
      <Card key={order.id}>
        <Card.Header as="h5">Order # {order.id}</Card.Header>
        <Card.Body>
          <Card.Title>Placed on: {formattedDate}</Card.Title>
          <Card.Text>
            Total: ${order.totalPrice}
          </Card.Text>
          <Button variant="primary" onClick={() => router.push(`/users/${order.userId}/order_history`)}>Back To Orders</Button>
        </Card.Body>
        {order.products?.map((p) => (
          <Card key={p.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={p.image} />
            <Card.Body>
              <Card.Title>{p.productName}</Card.Title>
              <Card.Text>
                {p.price}
              </Card.Text>
            </Card.Body>
          </Card>

        ))}
      </Card>
    </div>
  );
}
