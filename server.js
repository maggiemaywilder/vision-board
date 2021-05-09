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

// Define API routes here
app.get('/api/boards', async (req, res) => {

});

app.get('/api/board', async (req, res) => {

});

app.get('/api/users', async (req, res) => {

});

app.get('api/user/:userEmail', async (req, res) => {

});

app.post('/api/users', async (req, res) => {

});

app.post('/api/boards', async (req, res) => {

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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/index.html"));
});

// Start the API server
db.sequelize.sync().then(() => {
  console.log('sequelized');
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });  
})




