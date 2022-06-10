const { Session } = require('../../models');

const create = async sessionToCreate => {
  try {
    const result = await Session.create({
      token: sessionToCreate.token,
      token_user_id: sessionToCreate.id,
      created_at: Date.now()
    });
    return result;
  } catch (error) {
    return error;
  }
};

const destroy = async sessionToDelete => {
  try {
    const result = await Session.destroy({
      where: {
        token: sessionToDelete
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
  destroy
};
