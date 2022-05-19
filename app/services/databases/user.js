const bcrypt = require('bcryptjs');
const { User } = require('../../models');

const store = async userToCreate => {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: userToCreate.email
      },
      defaults: {
        first_name: userToCreate.first_name,
        last_name: userToCreate.last_name,
        email: userToCreate.email,
        password: bcrypt.hashSync(userToCreate.password, 10)
      }
    });
    return [user, created];
  } catch (error) {
    return error;
  }
};

const getOne = async userToFind => {
  try {
    const result = await User.findOne({
      where: {
        email: userToFind.email
      }
    });
    if (result) {
      const isSamePassword = bcrypt.compareSync(userToFind.password, result.password);
      const userFounded = result && isSamePassword === true ? result.email : null;
      return userFounded;
    }
    return result;
  } catch (error) {
    return error;
  }
};

const getAll = async ({ offset, limit }) => {
  try {
    const result = await User.findAll({
      attributes: ['id', 'first_name', 'last_name', 'email'],
      offset,
      limit
    });
    const isSamePassword = bcrypt.compareSync(userToFind.password, result.password);
    const userFounded = result && isSamePassword === true ? result.email : null;
    return userFounded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  store,
  getOne,
  getAll
};
