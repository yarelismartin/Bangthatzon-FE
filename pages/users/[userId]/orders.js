/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getOrderInCart } from '../../../api/OrderData';
import { removeProductFromCart } from '../../../api/ProductData';

export default function ViewCart() {
  const router = useRouter();
  const { userId, status } = router.query;
  const [order, setOrder] = useState();

  const handleClick = (productId) => {
    removeProductFromCart(order.id, productId).then(() => {
      getOrderInCart(userId, status).then(setOrder);
    });
  };

  useEffect(() => {
    if (userId && status) {
      // Fetch orders based on userId and status
      getOrderInCart(userId, status).then(setOrder);
    }
  }, [userId, status]);

  return (
    <div className="w-[70%] mx-auto mb-[25px] mt-[25px]">
      {order?.products?.length <= 0 ? (
        <><h1>Your Cart is empty! Let&apos;s fix that!</h1>
          <Link href="/products" passHref>
            <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>Start Shopping</p>
          </Link>
        </>
      )
        : (
          <>
            <div className=" flex justify-center flex-col gap-3">
              {order?.products?.map((p) => (
              // <Card style={{ width: '18rem' }} key={p.id}>
              //   <Card.Img variant="top" src={p.image} />
              //   <Card.Body>
              //     <p>
              //       Seller: {p.seller?.firstName} {p.seller?.lastName}
              //     </p>
              //     <Card.Title>{p.productName}</Card.Title>
              //     <p>$ {p.price}</p>
              //     <Button variant="danger" onClick={() => handleClick(p.id)}>Remove</Button>
              //   </Card.Body>
              // </Card>
                <div className="flex" key={p.id}>
                  <div className="mr-[15px]">
                    <img alt="product" src={p.image} style={{ width: '140px', height: '185px' }} />
                  </div>
                  <div className="mr-auto">
                    <h3 className="mb-[10px] font-semibold">{p.productName}</h3>
                    <h3 className="font-light">Seller: {p.seller?.firstName} {p.seller?.lastName}</h3>
                  </div>
                  <div className="ml-auto">
                    <h3 className="mb-[10px] font-semibold">${p.price}</h3>
                    <svg onClick={() => handleClick(p.id)} className="ml-auto svg-hover-effect cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.792893 0.792893C1.18342 0.402369 1.81658 0.402369 2.20711 0.792893L7.5 6.08579L12.7929 0.792893C13.1834 0.402369 13.8166 0.402369 14.2071 0.792893C14.5976 1.18342 14.5976 1.81658 14.2071 2.20711L8.91421 7.5L14.2071 12.7929C14.5976 13.1834 14.5976 13.8166 14.2071 14.2071C13.8166 14.5976 13.1834 14.5976 12.7929 14.2071L7.5 8.91421L2.20711 14.2071C1.81658 14.5976 1.18342 14.5976 0.792893 14.2071C0.402369 13.8166 0.402369 13.1834 0.792893 12.7929L6.08579 7.5L0.792893 2.20711C0.402369 1.81658 0.402369 1.18342 0.792893 0.792893Z" />
                    </svg>

                  </div>
                  <hr style={{ border: '1px solid black', margin: '20px 0' }} />
                </div>
              ))}

              <h2 className="font-semibold ml-auto mt-[10px] mb-[10px]">Total: ${order?.totalPrice}</h2>
              <Button onClick={() => router.push(`/users/${userId}/${order.id}/checkout`)} style={{ backgroundColor: 'black', border: 'none', color: 'white' }}>Checkout</Button>
            </div>
          </>
        )}
    </div>
  );
}
