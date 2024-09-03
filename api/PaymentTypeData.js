import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUsersPaymentTypes = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${userId}/payment-types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

export default getUsersPaymentTypes;
