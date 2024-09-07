/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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

  const formattedDate = new Date(order.purchaseDate).toLocaleDateString();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Main Card */}
      <div className="w-[60%] bg-white p-10 rounded-lg shadow-lg">
        {/* Title Section */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Thank You For Your Order!</h1>
        <p className="text-gray-600 text-center mb-6">
          Please check your inbox, as a confirmation email is on its way.
        </p>

        {/* Order Details */}
        <div className="border-t border-gray-300 pt-6 mt-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">Order Total:</span>
            <span className="text-gray-700">${order.totalPrice}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">Order Reference:</span>
            <span className="text-gray-700">#{orderId}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">Purchase Date:</span>
            <span className="text-gray-700">{formattedDate}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700">Order Status:</span>
            <span className="text-gray-700">Received</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mt-4">{order.products.length} Item(s)</h3>
        </div>

        {/* Order Items */}
        <div className="border-t border-gray-300 pt-6 mt-2">
          {order.products?.map((p) => (
            <div className="flex items-center mb-4">
              <img
                src={p.image} // Replace with actual image path
                alt="Item"
                className="w-20 h-30 rounded-lg mr-4"
              />
              <div className="mb-auto">
                <p className="font-semibold text-gray-700">{p.productName}</p>
                <p className="text-gray-600">Price: ${p.price}</p>
              </div>
            </div>

          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button onClick={() => router.push(`/users/${order.userId}/order_history`)} className="mr-2">
            Go to Order History
          </Button>
          <Button onClick={() => router.push('/products')} variant="secondary">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
