module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'Session',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      token_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'sessions',
      timestamps: true,
      underscored: true,
      paranoid: true
    }
  );
  return Session;
};
