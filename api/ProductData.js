import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getRecentProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/recent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProductsInCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/categorys/${categoryId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSellersProducts = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/sellers/${sellerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addProductToCart = (productId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/products/${productId}/addProduct`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userId),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const removeProductFromCart = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${orderId}/removeProduct`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.text())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export {
  getRecentProducts,
  getProductsInCategory,
  getProducts,
  getSingleProduct,
  getSellersProducts,
  addProductToCart,
  removeProductFromCart,
};
