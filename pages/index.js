import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { getRecentProducts } from '../api/ProductData';
import ProductCard from '../components/ProductCard';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState();
  const [products, setProducts] = useState();

  const handleUpdate = () => {
    checkUser(user.uid).then((data) => setAuthUser(data));
  };

  const getNewProducts = () => {
    getRecentProducts().then(setProducts);
  };

  useEffect(() => {
    checkUser(user.uid).then((data) => setAuthUser(data[0]));
    getNewProducts();
  }, [user.uid]);
  console.warn(authUser, 'auth');

  return (
    <>
      {authUser ? (
        <div
          className="text-center d-flex flex-column justify-content-center align-content-center container"

        >
          <h1>Newest Items</h1>
          <div className="home-product-container flex">
            {
              products?.map((product) => (
                <ProductCard productObj={product} />
              ))
            }
          </div>
        </div>
      ) : (<RegisterForm user={user} updateUser={handleUpdate} />)}
    </>
  );
}

export default Home;
