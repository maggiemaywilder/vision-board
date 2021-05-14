require('dotenv').config();
module.exports ={
    "development": {
        "username": "root",
        "password": process.env.DB_PASS,
        "database": "vision_dev_db",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": process.env.JAWS_USER,
        "password": process.env.JAWS_PASS,
        "database": process.env.JAWS_DB,
        "host": process.env.JAWS_HOST,
        "dialect": "mysql"
      }
}