/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ProductDetail({ productObj }) {
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
          <h4>{`${productObj.seller?.firstName} ${productObj.seller?.lastName}`}</h4>
        </div>
        <h2>{productObj.productName}</h2>
        <p>{productObj.description}</p>
        <h3>$ {productObj.price}</h3>
        <br />
        <p>Quantity Available</p>
        <p>{productObj.quantityAvailable}</p>
        <p>Category</p>
        <p>{productObj.category?.categoryName}</p>
        <Button>Add to Cart</Button>
      </div>

    </div>
  );
}

ProductDetail.propTypes = {
  productObj: PropTypes.shape({
    image: PropTypes.string,
    productName: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantityAvailable: PropTypes.string,
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
