module.exports = function(sequelize, DataTypes) {
    var Bills = sequelize.define("Bill", {
      id: {type:DataTypes.INTEGER,primaryKey: true},
      billName: DataTypes.STRING,
      website: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      userId: DataTypes.INTEGER
    });
    return Bills;
  };

