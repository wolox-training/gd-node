module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define(
    'qualifications',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rating_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      weet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
          model: 'Weet',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.ENUM,
        values: [1, -1],
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
