module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Application, {
      foreignKey: "applicant_id",
      as: "applicant",
      onDelete: "cascade"
    });
    User.hasMany(models.Application, {
      foreignKey: "admin_id",
      as: "admin",
      onDelete: "cascade"
    });
  };

  return User;
};
