const { Weet } = require('../../models');
const { giveMeJokes } = require('../externals/geekJokes');

const store = async weetUser => {
  try {
    const myWeet = await giveMeJokes();
    const result = await Weet.create({
      content: myWeet,
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

const getOne = async weetId => {
  try {
    const result = await Weet.findOne({
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
  getOne
};
