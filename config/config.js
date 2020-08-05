require("dotenv").config();
module.exports = 
{
  "development": {
    "username": "root",
    "password": "1Ye!lding2",
    "database": "budgettracker_db",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "database_test",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }

};

