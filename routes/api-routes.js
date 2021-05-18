const router = require("express").Router();
const { response } = require("express");
const imagesDB = require("../controller/imgController.js");
const isAuthenticated = require('../config/middleware/auth');
const passport = require('../config/passport');
const path = require('path');
const db = require('../models');

router.get("/api/allImages", (req, res) => {
  response = imagesDB.findAllImages()
  res.send(response)
});

router.post("/api/addImage", async ({ body }, res) => {
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

router.delete("/api/images/", (req, res) => {
  response = imagesDB.deleteImage({ where: { url: req.id } })
  res.send(response)
});

// display users' boards
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

// batch of gets for displaying board: notes, tags, and images
router.get('/api/:bid/notes', async (req, res) => {
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

router.get('/api/:bid/tags', async (req, res) => {
  try {
    let currentTags = await db.Tag.findAll({
      where: {
        BoardId: parseInt(req.params.bid)
      }
    });
    console.log(currentNotes);
  } catch (err) {
    console.error(err)
  }
});

// router.get('/api/:bid/notes', async (req, res) => {
//   try {
//     let currentNotes = await db.Note.findAll({
//       where: {
//         BoardId: parseInt(req.params.bid)
//       }
//     });
//     console.log(currentNotes);
//   } catch (err) {
//     console.error(err)
//   }
// });

// router.get('/api/:bid/notes', async (req, res) => {
//   try {
//     let currentNotes = await db.Note.findAll({
//       where: {
//         BoardId: parseInt(req.params.bid)
//       }
//     });
//     console.log(currentNotes);
//   } catch (err) {
//     console.error(err)
//   }
// });


// display specific board 
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

// since userName is created from first and last name, I think this should be based on userID
// but since that one is next, do we need this one?
router.get('/api/users/:username', async (req, res) => {
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

router.get('/api/users/:uid', async (req, res) => {
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

router.post('/api/boards/:uid/new', async (req, res) => {
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
router.put('/api/boards/:bid', async (req, res) => {
  try {
    let adjustedBoard = await db.Board.update({
      name: req.body.name
     }, {
      where: {
        id: parseInt(req.params.bid)
      }
    });
    res.send(adjustedBoard);
  } catch (err) {
    console.error(err);
  }
});

router.post('/api/:bid/notes', async (req, res) => {
  try {
    let newNote = await db.Note.create({
      url: req.body.url,
      BoardId: parseInt(req.params.bid)
    });
    res.json(newNote);
  } catch (err) {
    console.error(err)
  }

});

router.delete('/api/links/:linkId', async (req, res) => {
  try {
    let deleteNote = await db.Note.delete({
      type: req.body.text,
      topic: req.body.url
    });
    res.json(deleteNote);
  } catch (err) {
    console.error(err)
  }

});

router.delete('/api/images/:imgId', (req, res) => {

});

router.delete('/api/tags/:tagId', (req, res) => {

});

// Send every other request to the React app
// Define any API routes before this runs
router.get("*", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;