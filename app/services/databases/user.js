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
        password: bcrypt.hashSync(userToCreate.password, 10),
        role_id: userToCreate.role_id,
        position: userToCreate.position
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
    return result;
  } catch (error) {
    return error;
  }
};

const getById = async userToFind => {
  try {
    const result = await User.findByPk(userToFind, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'role_id', 'position']
    });
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
    return result;
  } catch (error) {
    return error;
  }
};

const create = async userToCreate => {
  try {
    const result = await User.create({
      first_name: userToCreate.first_name,
      last_name: userToCreate.last_name,
      email: userToCreate.email,
      password: bcrypt.hashSync(userToCreate.password, 10),
      role_id: 'administrator'
    });
    return result;
  } catch (error) {
    return error;
  }
};

const update = async userToUpdate => {
  try {
    userToUpdate.password = bcrypt.hashSync(userToUpdate.password, 10);
    userToUpdate.role_id = 'administrator';
    const result = await User.update(userToUpdate, {
      where: {
        email: userToUpdate.email
      }
    });
    return result;
  } catch (error) {
    return error;
  }
};

const updatePosition = async (userId, userToUpdate) => {
  try {
    const result = await User.update(
      { position: userToUpdate },
      {
        where: {
          id: userId
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

module.exports = {
  store,
  getOne,
  getById,
  getAll,
  update,
  create,
  updatePosition
};
