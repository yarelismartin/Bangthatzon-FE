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
  }, [SellerProducts]);

  return (
    <div>
      {sellerProducts.products?.map((product) => (
        <ProductCard productObj={product} key={product.id} />
      ))}
    </div>
  );
}
