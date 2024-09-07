/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getUsersOrderHistory } from '../../../api/OrderData';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  const getOrders = () => {
    getUsersOrderHistory(userId).then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, [userId]);

  return (
    <div className="flex mt-[20px] flex-col gap-4">
      {orders.map((order) => {
        const formattedDate = new Date(order.purchaseDate).toLocaleDateString();
        return (

          <Card key={order.id} className="w-[70%]">
            <Card.Header as="h5">Order # {order.id}</Card.Header>
            <Card.Body>
              <Card.Title>Placed on: {formattedDate}</Card.Title>
              <Card.Title>
                Total: ${order.totalPrice}
              </Card.Title>
              <Button variant="primary" onClick={() => router.push(`/orders/${order.id}`)}>Order Deatil</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
