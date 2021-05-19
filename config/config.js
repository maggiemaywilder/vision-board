require('dotenv').config();
module.exports ={
    "development": {
        "username": process.env.JAWS_USER,
        "password": process.env.JAWS_PASS,
        "database": process.env.JAWS_DB,
        "host": process.env.JAWS_HOST,
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