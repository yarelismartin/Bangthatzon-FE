import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getOrderInCart } from '../../../api/OrderData';

export default function ViewCart() {
  const router = useRouter();
  const { userId, status } = router.query;
  const [order, setOrder] = useState();

  useEffect(() => {
    if (userId && status) {
      // Fetch orders based on userId and status
      getOrderInCart(userId, status).then(setOrder);
    }
  }, [userId, status]);

  console.warn('order', order);

  return (
    <div>
      {order?.products?.length <= 0 ? <h1>You have no Products in your cart</h1>
        : (order?.products?.map((p) => (
          <Card style={{ width: '18rem' }} key={p.id}>
            <Card.Img variant="top" src={p.image} />
            <Card.Body>
              <p>
                Seller: {p.seller?.firstName} {p.seller?.lastName}
              </p>
              <Card.Title>{p.productName}</Card.Title>
              <p>$ {p.price}</p>
            </Card.Body>
          </Card>
        )))}
    </div>
  );
}
