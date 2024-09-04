import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSingleUser = (userId, userDetail) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDetail),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getSingleUser, updateSingleUser };
