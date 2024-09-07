/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
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
  }, [sellerId]);

  return (
    <div>
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full lg:w-2/3 xl:w-1/2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex bg-black text-white rounded-t-lg h-48">
                <div className="flex flex-col items-center justify-start mt-[65px] ml-5 w-36">
                  <img
                    src={sellerProducts.image}
                    alt={`${sellerProducts.firstName} ${sellerProducts.lastName}`}
                    className="rounded-full w-36 h-36 object-cover z-10 border-4 border-white"
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>
                <div className="ml-5 mt-28">
                  <h5 className="text-lg">{`${sellerProducts.firstName} ${sellerProducts.lastName}`}</h5>
                  <p>@{sellerProducts.username}</p>
                </div>
              </div>
              <div className="text-black p-4 mt-16">
                <div className="grid grid-cols-2 gap-2">
                  {sellerProducts.products?.map((product) => (
                    <ProductCard productObj={product} key={product.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
