const { Op } = require('sequelize');
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
      where: { [Op.and]: [{ rating_user_id: findUser }, { weet_id: findWeet }] }
    });
    return result;
  } catch (error) {
    return error;
  }
};

const update = async ({ findWeet, weetScore }) => {
  try {
    const result = await Qualification.update(
      { score: weetScore },
      {
        where: {
          id: findWeet
        },
        returning: true,
        plain: true
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

const totalWeet = async ({ findUser, findWeet }) => {
  try {
    const result = await Qualification.count({
      where: { [Op.and]: [{ rating_user_id: findUser }, { weet_id: findWeet }] }
    });
    return result;
  } catch (error) {
    return error;
  }
};

const sumScore = async findWeet => {
  try {
    const result = await Qualification.sum('score', {
      where: {
        weet_id: findWeet
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store,
  getOne,
  update,
  totalWeet,
  sumScore
};
