module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'users',
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
            unique: true
        },
        password:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
      },
      {
        timestamps: false
      }
    );
    return User;
  };