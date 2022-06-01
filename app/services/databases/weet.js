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

const getAll = async ({ offset, limit }) => {
  try {
    const result = await Weet.findAll({ offset, limit });
    return result;
  } catch (error) {
    return error;
  }
};

const update = async weetId => {
  try {
    const result = await Weet.update({
      where: {
        id: weetId
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store,
  getAll,
  update
};
