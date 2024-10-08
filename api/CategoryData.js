import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => resolve(resp.json()))
    .catch(reject);
});

export default getAllCategories;
