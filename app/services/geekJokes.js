const axios = require('axios').default;

const URL = `${process.env.WEETS_API_URL}?format=json`;

function giveMeJokes() {
  return axios
    .get(URL)
    .then(response => response)
    .catch(error => error);
}

module.exports = {
  giveMeJokes
};
