const bcrypt = require('bcryptjs');
const { query } = require('express');
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
        role_id: userToCreate.role_id
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
      const dataUser = {
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        role_id: result.role_id
      };
      const isSamePassword = bcrypt.compareSync(userToFind.password, result.password);
      const userFounded = result && isSamePassword === true ? dataUser : null;
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

module.exports = {
  store,
  getOne,
  getAll,
  update,
  create
};
