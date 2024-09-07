/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
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
    <div className="flex flex-col md:flex-row mt-4">
      {/* Product Image Section */}
      <div className="">
        <img
          src={productObj.image}
          alt="product"
          style={{ width: '300px', height: '500px', objectFit: 'cover' }}
        />
      </div>

      <div className="w-full md:w-1/2 px-4">
        <h1 className="text-3xl font-bold">{productObj.productName}</h1>
        <p className="text-xl text-gray-500">{productObj.category?.categoryName}</p>
        <p className="text-2xl text-black mt-2">${productObj.price}</p>

        <hr className="my-4 border-gray-300" />

        <div className="mt-4">
          <a href={`/products/sellers/${productObj.sellerId}`}>
            <h3 className="text-lg font-semibold">Sold By: {`${productObj.seller?.firstName} ${productObj.seller?.lastName}`}</h3>
            <div className="flex space-x-4 mt-2">
              <img
                src={productObj.seller?.image}
                alt="sellers"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '15px',
                }}
              />
            </div>
          </a>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Size Selection */}
        <div className="mt-4">
          <p className="text-xl text-gray-500">{productObj.description}</p>

          <hr className="my-4 border-gray-300" />

          <h3 className="text-lg font-semibold mt-auto">Quantity Available</h3>
          <div className="flex space-x-4 mt-2">
            <div
              className="px-4 py-2 border"
            >
              {productObj.quantityAvailable}
            </div>
          </div>
        </div>

        {/* Quantity and Add to Cart Button */}
        <div className="mt-5">
          <div className="flex items-center space-x-4 flex-end">
            <button
              type="button"
              onClick={handleClick}
              className="custom-button"
              disabled={productObj.quantityAvailable <= 0}
            >
              {productObj.quantityAvailable > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
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
