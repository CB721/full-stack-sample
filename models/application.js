module.exports = function (sequelize, DataTypes) {
  const Application = sequelize.define("Application", {
    applicant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    admin_id: DataTypes.INTEGER,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    approved: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: [10]
      }
    }
  });

  Application.associate = function (models) {
    Application.belongsTo(models.User, {
      foreignKey: "applicant_id",
      as: "applicant",
      onDelete: "cascade"
    });
    Application.belongsTo(models.User, {
      foreignKey: "admin_id",
      as: "admin",
      onDelete: "cascade"
    });
  };

  return Application;
};
