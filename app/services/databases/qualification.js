const { Qualification } = require('../../models');

const store = async ({ findUser, findWeet, weetScore }) => {
  try {
    const result = await Qualification.create({
      rating_user_id: findUser.id,
      weet_id: findWeet.id,
      score: weetScore
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store
};
