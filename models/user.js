module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      name: DataTypes.STRING
    });
  
    User.associate = function(models) {
      User.hasMany(models.Application, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  