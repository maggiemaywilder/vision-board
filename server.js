const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('dotenv').config();

// const db = require('./config/connection');

// db.authenticate()
//   .then(() => console.log('DB connected'))
//   .catch(err => console.log('error'))

// const User = require("./models/User");

app.get('/', (req, res) => console.log('something'));

// Start the API server
db.sequelize.sync().then(() => {
  console.log('sequelized');
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });  
})
