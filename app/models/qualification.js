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
        references: {
          model: 'Weet',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
