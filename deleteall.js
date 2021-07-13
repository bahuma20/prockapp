const fetch = require('node-fetch');

let token;

fetch('https://formio.prock.apps.bahuma.io/user/login', {
  method: 'post',
  body: JSON.stringify({
    "data": {
      "email": "max.bachhuber@bahuma.io",
      "password": "FdndkgW7"
    }
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {
  token = response.headers.get('x-jwt-token');

  return fetch('https://formio.prock.apps.bahuma.io/regiebericht/submission', {
    method: 'get',
    headers: {
      'x-jwt-token': token,
    }
  })
}).then(response => {
  return response.json()
}).then(data => {
  let promises = [];

  data.forEach(submission => {
    if (submission._id !== '5fc11072eae72d73ce42e85b') {
      promises.push(fetch('https://formio.prock.apps.bahuma.io/regiebericht/submission/' + submission._id, {
        method: 'delete',
        headers: {
          'x-jwt-token': token,
        }
      }));
    }
  })

  return Promise.all(promises);
}).then(responses => {
  let promises = [];
  responses.forEach(response => {
    promises.push(response.text());
  });

  return Promise.all(promises)
}).then(datas => {
  console.log(datas);
})
