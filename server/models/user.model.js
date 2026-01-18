module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "full_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone_number",
    },
    isPremium: {
      type: DataTypes.STRING,
      defaultValue: "false",
      field: "is_premium",
    },
    totalExpenses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "total_expenses",
    },
  });

  return User;
};
