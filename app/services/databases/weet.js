const { Weet } = require('../../models');
const { giveMeJokes } = require('../externals/geekJokes');

const store = async weetUser => {
  try {
    const myWeet = await giveMeJokes(); 
    const result = await Weet.create({
      content: myWeet.data.joke,
      user_id: weetUser.decoded.id
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store
};
