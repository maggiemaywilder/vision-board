const router = require("express").Router();
const { response } = require("express");
const imagesDB = require("../controller/imgController.js");
const isAuthenticated = require('../config/middleware/auth');
const passport = require('../config/passport');
const path = require('path');
const db = require('../models');

router.get("/api/allImage", (req, res) => {
  response = imagesDB.findAllImages()
  res.send(response)
})

router.post("/api/addImage", (req, res) => {
  response = imagesDB.addImage({ text: req.text, url: req.url })
  res.send(response)
})

router.delete("/api/images/:imgId", (req, res) => {
  response = imagesDB.deleteImage({ where: { url: req.id } })
  res.send(response)
})

router.get('/api/:uid/boards', async (req, res) => {
  try {
    let currentUserBoards = await db.Board.findAll({
      where: {
        UserId: parseInt(req.params.uid)
      }
    });
    res.json(currentUserBoards);
  } catch (err) {
    console.error(err)
  }


});

router.get('/api/boards/:bid', async (req, res) => {
  try {
    let currentBoard = await db.Board.findOne({
      where: {
        id: parseInt(req.params.bid)
      }
    });
    res.json(currentBoard);
  } catch (err) {
    console.error(err)
  }
});

router.post('/api/login', passport.authenticate('local'), (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/api/users', async (req, res) => {
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

router.post('/api/boards/new', async (req, res) => {
  try {
    let newBoard = await db.Board.create({
      name: "New Board",
      topic: "None",
      UserId: parseInt(req.body.id)
    });
    res.json(newBoard);
  } catch (err) {
    console.error(err)
  }
});

//update where if we want to identify by id
router.put('/api/boards/:bid', async (req, res) => {
  try {
    let adjustedBoard = await db.Board.update({ name: req.body.name, topic: req.body.topic }, {
      where: {
        name: req.body.name
      }
    });
    res.json(adjustedBoard);
  } catch (err) {
    console.error(err);
  }
});

router.post('/api/links', async (req, res) => {
  try {
    let newUpload = await db.Upload.create({
      type: req.body.text,
      topic: req.body.url
    });
    res.json(newUpload);
  } catch (err) {
    console.error(err)
  }

});

router.post('api/tags/', async (req, res) => {
  try {
    let newTag = await db.Tag.create({
      tagName: req.body.text
    });
    res.json(newTag);
  } catch(err) {
    console.error(err)
  }
})


router.delete('/api/links/:linkId', async (req, res) => {
  try {
    let deleteUpload = await db.Upload.delete({
      type: req.body.text,
      topic: req.body.url
    });
    res.json(deleteUpload);
  } catch (err) {
    console.error(err)
  }

});


router.delete('/api/tags/:tagId', (req, res) => {
  try {
    let deleteTag = await db.Tag.delete({
      where: {
        name: req.body.name
      }
     });
     res.join(deleteTag);
  } catch (err) {
    console.error(err)
  }

});

// Send every other request to the React app
// Define any API routes before this runs
router.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;