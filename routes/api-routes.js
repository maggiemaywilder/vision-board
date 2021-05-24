const router = require("express").Router();
const { response } = require("express");
const imagesDB = require("../controller/imgController.js");
const isAuthenticated = require('../config/middleware/auth');
const passport = require('../config/passport');
const path = require('path');
const { Op } = require('sequelize');
const db = require('../models');

router.get("/allImage", (req, res) => {
  response = imagesDB.findAllImages()
  res.send(response)
});

router.post("/addImage", async ({ body }, res) => {
  try {
    let newImg = await db.Image.create({
      url: body.img,
      BoardId: body.bid
    });
    res.json(newImg);
  } catch (err) {
    console.error(err);
  } 
});

// display users' boards
router.get('/:uid/boards', async (req, res) => {
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

// batch of gets for displaying board: notes, tags, and images
router.get('/:bid/notes', async (req, res) => {
  try {
    let currentNotes = await db.Note.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    console.log(currentNotes);
  } catch (err) {
    console.error(err)
  }
});

router.get('/:bid/uploads', async (req, res) => {
  try {
    let currentUploads = await db.Upload.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    res.json(currentUploads);
  } catch (err) {
    console.error(err)
  }
});

router.get('/:bid/images', async (req, res) => {
  try {
    let currentImages = await db.Image.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    res.json(currentImages);
  } catch (err) {
    console.error(err)
  }
});

router.get('/:bid/links', async (req, res) => {
  try {
    let currentLinks = await db.Link.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    res.json(currentLinks);
  } catch (err) {
    console.error(err)
  }
});

router.get('/:bid/tags', async (req, res) => {
  try {
    let currentTags = await db.Tag.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    res.json(currentTags);
  } catch (err) {
    console.error(err)
  }
});


// display specific board 
router.get('/boards/:bid', async (req, res) => {
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

// since userName is created from first and last name, I think this should be based on userID
// but since that one is next, do we need this one?
router.get('/users/:username', async (req, res) => {
  try {
    let currentUser = db.User.findOne({
      where: {
        userName: req.params.username
      }
    });
    res.json(currentUser);
  } catch (err) {
    console.error(err);
  }
});

router.get('/users/:uid', async (req, res) => {
  try {
    let currentUser = await db.User.findAll({
      where: {
        id: parseInt(req.params.uid)
      }
    });
    res.json(currentUser);
  } catch (err) {
    console.error(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/users', async (req, res) => {
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

router.post('/boards/:uid/new', async (req, res) => {
  try {
    let newBoard = await db.Board.create({
      name: "New Board",
      topic: "None",
      UserId: parseInt(req.params.uid)
    });
    res.json(newBoard);
  } catch (err) {
    console.error(err)
  }
});

//update where if we want to identify by id
router.put('/boards/:bid', async (req, res) => {
  try {
    let adjustedBoard = await db.Board.update({name: req.body.name}, {
      where: {
          id: parseInt(req.params.bid)
      }
    });
    res.json([ adjustedBoard ]);
  } catch (err) {
    console.error(err);
  }
});

router.post('/:bid/uploads', async (req, res) => {
  try {
    let newUpload = await db.Upload.create({
      url: req.body.url,
      BoardId: parseInt(req.params.bid)
      });
    res.json(newUpload);
  } catch (err) {
    console.error(err)
  }
});

router.post('/:bid/links', async (req, res) => {
  try {
    let newLink = await db.Link.create({
      url: req.body.url,
      type: req.body.type,
      BoardId: parseInt(req.params.bid)
    });
    res.json(newLink);
  } catch (err) {
    console.error(err)
  }
});


router.post('/tags/:bid', async (req, res) => {
  try {
    let newTag = await db.Tag.create({
      tagName: req.body.text,
      BoardId: parseInt(req.params.bid),
    });
    res.json(newTag);
  } catch(err) {
    console.error(err)
  }
});

router.delete('/uploads/:mid', async (req, res) => {
  try {
    let deleteUpload = await db.Upload.destroy({
      where: {
        id: parseInt(req.params.mid)
      }
    });
    res.json(deleteUpload);
  } catch (err) {
    console.error(err)
  }
});

router.delete('/images/:iid', async (req, res) => {
  try {
    let deleteImg = await db.Image.destroy({
      where: {
        id: parseInt(req.params.iid)
      }
    });
    res.json(deleteImg);
  } catch (err) {
    console.error(err)
  }
});

router.delete('/links/:lid', async (req, res) => {
  try {
    let deleteLink = await db.Link.destroy({
      where: {
        id: parseInt(req.params.lid)
      }
    });
    res.json(deleteLink);
  } catch (err) {
    console.error(err)
  }
});


router.delete('/tags/:tagId', async (req, res) => {
  try {
    let deleteTag = await db.Tag.destroy({
      where: {
        id: parseInt(req.params.tagId)
      }
     });
     res.json(deleteTag);
  } catch (err) {
    console.error(err);
  }

});

// Send every other request to the React app
// Define any API routes before this runs
router.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;