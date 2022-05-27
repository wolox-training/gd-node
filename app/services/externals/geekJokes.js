const axios = require('axios').default;

const URL = `${process.env.WEETS_API_URL}?format=json`;

function shortJoke(stringJoke) {
  const originalJoke = stringJoke.slice(0, 139);
  const findSpace = originalJoke.lastIndexOf(' ');
  const finalJoke = originalJoke.slice(0, findSpace);
  return finalJoke;
}

function giveMeJokes() {
  return axios
    .get(URL)
    .then(response => {
      const newJoke = response.data.joke;
      const jokeToSend = newJoke.length > 140 ? shortJoke(newJoke) : newJoke;
      return jokeToSend;
    })
    .catch(error => error);
}

module.exports = {
  giveMeJokes
};
