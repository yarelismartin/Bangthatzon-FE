import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export default function ProductCard({ productObj }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={productObj.image} />
        <Card.Body>
          <a href={`/products/${productObj.id}`}>
            <Card.Title>{productObj.productName}</Card.Title>
          </a>
          <Card.Text>
            $ {productObj.price}
          </Card.Text>
        </Card.Body>
      </Card>
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
