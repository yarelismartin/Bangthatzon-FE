import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrderInCart = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${userId}/orders/open`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

const placeOrder = (orderId, orderDetails) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/${orderId}/place`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderDetails),
  })

    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          reject(new Error(err.message || 'Failed to place order.'));
        });
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const getOrderSummary = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/orders/completed/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsersOrderHistory = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${userId}/orders/closed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrderInCart, placeOrder, getOrderSummary, getUsersOrderHistory,
};
