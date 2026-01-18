module.exports = (sequelize, DataTypes) => {
  const forgotPassword = sequelize.define(
    "ForgotPassword",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active",
      },
    },
    {
      tableName: "password_reset_requests",
    },
  );
  return forgotPassword;
};
