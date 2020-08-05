module.exports = function(sequelize, DataTypes) {
    var Expenses = sequelize.define("Expense", {
      id: {type:DataTypes.INTEGER,primaryKey: true},
      expenseName: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    //   categoryId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      userId: DataTypes.INTEGER
    });

    Expenses.associate = function(models) {
        // We're saying that a Expense should belong to an Category
        // An expense can't be created without an Category due to the foreign key constraint
        Expenses.belongsTo(models.categories, {
          foreignKey: {
            allowNull: false
          }
        });
      };


    return Expenses;
  };

