const express = require("express");
const session = require('express-session');
const passport = require('./config/passport');
const isAuthenticated = require('./config/middleware/auth');
const path = require("path");

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

// Define API routes here
app.get('/api/:uid/boards', async (req, res) => {
  try {
      const userBoards = await db.Board.findAll({
        where: {
          UserId: parseInt(req.params.uid)
        }
      });
      if (userBoards) {
        res.json(userBoards);
      } else {
        res.send({data: {}})
      }  
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/boards/:bid', async (req, res) => {
  try {
    const selectedBoard = await db.Board.findOne({
      where: {
        id: parseInt(req.params.bid)
      }
    })
    res.json(selectedBoard);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/users', async (req, res) => {

});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    }
    
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    let newUser = await db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
     });
    res.json(newUser);
  } catch (err) {
    console.error(err)
  }
});

app.post('/api/boards/new', async (req, res) => {
  try {
    const newBoard = await db.Board.create({
      name: 'New Board',
      topic: 'None',
      UserId: parseInt(req.body.id)
    });
    res.json(newBoard);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put('/api/boards/:bid', (req, res) => {
  
});

app.post('/api/links', async (req, res) => {

});

app.post('/api/images', async (req, res) => {

});

app.delete('/api/links/:linkId', (req, res) => {

});

app.delete('/api/images/:imgId', (req, res) => {

});

app.delete('/api/tags/:tagId', (req, res) => {

});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

// Start the API server
db.sequelize.sync().then(() => {
  console.log('sequelized');
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });  
})




