const express = require("express");
const session = require('express-session');
const passport = require('./config/passport');
const routes = require("./routes/api-routes.js")

const PORT = process.env.PORT || 3001;
const app = express();


const db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
  secret: 'vision-boarder-dev',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

// Start the API server
db.sequelize.sync().then(() => {
  console.log('sequelized');
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });  
})




