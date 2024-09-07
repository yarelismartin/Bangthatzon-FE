/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { getOrderSummary } from '../../api/OrderData';
import { addProductToCart } from '../../api/ProductData';
import { getSingleUser } from '../../api/UserData';
import { useAuth } from '../../utils/context/authContext';

export default function OrderDetail() {
  const [order, setOrder] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();
  const { orderId } = router.query;
  const { user } = useAuth();

  const handleClick = async (id) => {
    if (order.userId) {
      const response = await addProductToCart(id, order.userId);
      if (response.message === 'Item is already in your cart') {
        alert('Item is already in your cart');
      } else {
        router.push(`/users/${order.userId}/orders?status=open`);
      }
    }
  };

  useEffect(() => {
    let isMounted = true; // Add this variable to track component mount status

    const getOrderDeatil = () => {
      getOrderSummary(orderId).then((orderData) => {
        if (isMounted) { // Only update state if component is still mounted
          setOrder(orderData);
        }
      });
    };

    const getUser = () => {
      getSingleUser(user.uid).then(setUserInfo);
    };

    getOrderDeatil();
    getUser();

    return () => {
      isMounted = false;
    };
  }, [user.uid]);

  const formattedDate = new Date(order.purchaseDate).toLocaleDateString();

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 mx-auto mb-5 mt-3">
      <Card key={order.id}>
        <div>
          <Card.Header as="h5" className="d-flex">
            <div className="text-left mr-auto">
              <h2>Order #</h2>
              <h2>{order.id}</h2>
            </div>
            <div className="border-l border-gray-400 px-4 m-auto">
              <h2>Order Date</h2>
              <h2>{formattedDate}</h2>
            </div>
            <div className="border-l border-gray-400 px-4 m-auto">
              <h2>Ship To</h2>
              <h2>{userInfo.address}</h2>
            </div>
            <div className="border-l border-gray-400 px-4 m-auto">
              <h2>Total:</h2>
              <h2>${order.totalPrice}</h2>
            </div>
          </Card.Header>
        </div>
        <Card.Body>
          <Button variant="primary" onClick={() => router.push(`/users/${order.userId}/order_history`)}>Back To Orders</Button>
        </Card.Body>
        <div className="flex flex-wrap gap-4 justify-center pb-5">
          {order.products?.map((p) => (
            <div className="card card-side bg-base-100 shadow-xl m-2 pr-10" key={p.id}>
              <figure>
                <img
                  src={p.image}
                  alt="product"
                  className="w-40 h-100 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{p.productName}</h2>
                <p>${p.price}</p>
                <div className="card-actions justify-end">
                  <button type="button" className="btn btn-primary" onClick={() => router.push(`/products/${p.id}`)}>View</button>
                  <button type="button" className="btn btn-primary" onClick={() => handleClick(p.id)}>Buy Again</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
