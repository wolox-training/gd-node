const { Qualification } = require('../../models');
const { Op } = require("sequelize");

const store = async ({ findUser, findWeet, weetScore }) => {
  try {
    const result = await Qualification.create({
      rating_user_id: findUser,
      weet_id: findWeet,
      score: weetScore
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getOne = async ({ findUser, findWeet }) => {
  try {
    const result = await Qualification.findOne({
      where: {
        [Op.and]: [
          { rating_user_id: findUser },
          { weet_id: findWeet }
        ]
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

const update = async weetId => {
  try {
    console.log(findUser, findWeet);
    const result = await Qualification.update({
      where: {
        id: weetId
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

const sum = async ({ findUser, findWeet }) => {
  try {
    const result = await Qualification.count({
      where: {
        [Op.and]: [
          { rating_user_id: findUser },
          { weet_id: findWeet }
        ]
        }
    });
    console.log(result, '999');
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store,
  getOne,
  update,
  sum
};
