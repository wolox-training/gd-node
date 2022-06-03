module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define(
    'Qualification',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      weet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Weet',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [[1, -1]]
        },
        allowNull: false
      }
    },
    {
      tableName: 'qualifications',
      timestamps: false,
      underscored: true
    }
  );
  return Qualification;
};
