require('dotenv').config();
module.exports ={
    "development": {
        "username": "root",
        "password": process.env.DB_PASS,
        "database": "vision_dev_db",
        "host": "localhost",
        "port": 3306,
        "dialect": "mysql"
      },
    "test": {
        "username": process.env.JAWS_USER,
        "password": process.env.JAWS_PASS,
        "database": process.env.JAWS_DB,
        "host": process.env.JAWS_HOST,
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