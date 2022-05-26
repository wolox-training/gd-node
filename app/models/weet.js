module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        reference: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      tableName: 'weets',
      timestamps: false
    }
  );
  return Weet;
};
