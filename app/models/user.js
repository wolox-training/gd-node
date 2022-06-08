module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*[a-z])(?=.*[0-9])/gm,
          len: [8]
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 'standard'
      },
      position: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['developer', 'lead', 'tl', 'em', 'head', 'ceo'],
        defaultValue: 'developer'
      }
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true
    }
  );
  return User;
};
