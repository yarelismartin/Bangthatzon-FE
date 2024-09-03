/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addProductToCart } from '../api/ProductData';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/UserData';

export default function ProductDetail({ productObj }) {
  const { user } = useAuth();
  const [userId, setUserId] = useState();
  const router = useRouter();

  const getUser = async () => {
    const userData = await getSingleUser(user.uid);
    setUserId(userData.id);
  };
  const handleClick = async () => {
    if (userId) {
      const response = await addProductToCart(productObj.id, userId);
      router.push(`/users/${userId}/orders?status=open`);
      if (response.message === 'Item is already in your cart') {
        alert('Item is already in your cart');
      } else {
        router.push(`/users/${userId}/orders?status=open`);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [user]); // Add refresh to dependency array to re-run effect

  return (
    <div>
      <div className="product-img-container">
        <img src={productObj.image} alt="" />
      </div>
      <div className="product-detail-container">
        <div className="seller-info">
          <img
            src={productObj.seller?.image}
            alt="sellers"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <p>Seller</p>
          <h4><a href={`/products/sellers/${productObj.sellerId}`}>{`${productObj.seller?.firstName} ${productObj.seller?.lastName}`}</a></h4>
        </div>
        <h2>{productObj.productName}</h2>
        <p>{productObj.description}</p>
        <h3>$ {productObj.price}</h3>
        <br />
        <p>Quantity Available</p>
        <p>{productObj.quantityAvailable}</p>
        <p>Category</p>
        <p>{productObj.category?.categoryName}</p>
        <Button onClick={handleClick}>Add to Cart</Button>
      </div>

    </div>
  );
}

ProductDetail.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    productName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantityAvailable: PropTypes.number,
    sellerId: PropTypes.number,
    seller: PropTypes.shape({
      image: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    category: PropTypes.shape({
      categoryName: PropTypes.string,
    }),
  }).isRequired,
};
