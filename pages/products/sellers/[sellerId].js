/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSellersProducts } from '../../../api/ProductData';
import ProductCard from '../../../components/ProductCard';

export default function SellersProducts() {
  const [sellerProducts, setSellerProducts] = useState({});
  const router = useRouter();

  const { sellerId } = router.query;

  const SellerProducts = useCallback(() => {
    getSellersProducts(sellerId).then(setSellerProducts);
  }, [sellerId]);

  useEffect(() => {
    SellerProducts();
    console.warn(sellerProducts);
  }, [SellerProducts]);

  return (
    <div>

      {sellerProducts.length <= 0 ? (
        <p>No Products Available</p>
      ) : (sellerProducts.products?.map((product) => (
        <ProductCard productObj={product} key={product.id} />
      ))) }

    </div>
  );
}
