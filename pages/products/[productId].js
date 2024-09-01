/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../api/ProductData';
import ProductDetail from '../../components/ProductDetail';

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  const getProductDetail = () => {
    getSingleProduct(productId).then(setProduct);
  };

  useEffect(() => {
    getProductDetail();
  }, [productId]);

  return (
    <div>

      <ProductDetail productObj={product} />

    </div>
  );
}
