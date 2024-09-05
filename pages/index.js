import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { getRecentProducts } from '../api/ProductData';
import ProductCard from '../components/ProductCard';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState(null);
  const [products, setProducts] = useState([]);

  // const handleUpdate = () => {
  //   checkUser(user.uid).then((data) => setAuthUser(data));
  // };

  const getNewProducts = () => {
    getRecentProducts().then(setProducts);
  };

  const handleUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data[0]);
      getNewProducts();
    });
  };
  useEffect(() => {
    checkUser(user.uid).then((data) => {
      if (data.length > 0) {
        setAuthUser(data[0]);
      }
    });
    getNewProducts();
  }, [user.uid]);

  return (
    <>
      {authUser?.uid === user?.uid ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center container"

        >
          <h1>New Arrivals</h1>
          <div className="home-product-container flex">
            {products.length <= 0 ? (<p>No Products Available</p>) : (
              products?.map((product) => (
                <ProductCard productObj={product} key={product.id} />
              ))
            )}

          </div>
        </div>
      ) : (<RegisterForm onUpdate={handleUpdate} />)}
    </>
  );
}

export default Home;
