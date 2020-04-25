module.exports = function (sequelize, DataTypes) {
  const Application = sequelize.define("Application", {
    name: DataTypes.STRING
  });

  Application.associate = function (models) {
    Application.belongsTo(models.Application, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Application;
};
