// const { Weet } = require('../../models');
const { giveMeJokes } = require('../externals/geekJokes');

const store = async weetToCreate => {
  try {
    const result = await giveMeJokes();
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store
};
