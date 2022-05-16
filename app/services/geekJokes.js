const axios = require('axios').default;

const URL = `${process.env.WEETS_API_URL}?format=json`;

function giveMeJokes() { 
    return axios.get(URL)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
};

module.exports = {
    giveMeJokes
};
