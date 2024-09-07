/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ productObj }) {
  return (
    <div className="product-card">
      <a href={`/products/${productObj.id}`}>
        <img alt="product" className="product-card__image" src={productObj.image} />
        <div className="product-name-price">
          <p className="product-card__brand">{productObj.productName}</p>
          <p className="product-card__price mb-[50px]">${productObj.price}</p>
        </div>
      </a>

    </div>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    productName: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
