const router = require("express").Router();
const { response } = require("express");
const imagesDB = require("../controller/imgController.js")

router.get("/api/allImages", (req, res) => {
    response = imagesDB.findAllImages()
    res.send(response)
})

router.post("/api/addImage", (req, res) => {
    response = imagesDB.addImage({text: req.text, url: req.url})
    res.send(response)
})

router.delete("/api/images/", (req, res) => {
    response = imagesDB.deleteImage({where: {url: req.id}})
    res.send(response)
})

router.get('/api/boards', async (req, res) => {
    try{
      let bordoard = await db.Note.findAll({
        type: req.body.text,
        topic: req.body.url
      });
      res.json(board);
    } catch (err) {
      console.error(err)
    }
  
  
  });
  
  router.get('/api/board', async (req, res) => {
    try {let board = await User.findOne({
      where: {
        name: req.body.name
      }
    });
    res.json(board);
  } catch (err) {
    console.error(err)
  }
  });
  
  router.get('/api/users', async (req, res) => {
    try {
      let user = await db.User.findAll({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
       });
      res.json(user);
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
  
  router.post('/api/boards', async (req, res) => {
    try{
      let newBoard = await db.Board.create({
        name: req.body.name,
        topic: req.body.topic
      });
      res.json(newBoard);
    } catch (err) {
      console.error(err)
    }
  });
  
  //update where if we want to identify by id
  router.put('/api/boards/:bid', (req, res) => {
    try {let adjustedBoard = await db.Board.update({ name: req.body.name, topic: req.body.topic }, {
      where: {
        name: req.body.name
      }
    });
    res.json(adjustedBoard);}
    // try{
    //   let adjustedBoard = await db.Board.update({
    //     {name: req.body.name},    
    //     where: {name: req.body.name}
    //     })
    //   res.json(adjustedBoard);
    // } catch (err) {
    //   console.error(err)
    // }
  });
  
  router.post('/api/links', async (req, res) => {
    try{
      let newNote = await db.Note.create({
        type: req.body.text,
        topic: req.body.url
      });
      res.json(newNote);
    } catch (err) {
      console.error(err)
    }
  
  });
  
  router.post('/api/images', async (req, res) => {
  
  });
  
  router.delete('/api/links/:linkId', (req, res) => {
    try{
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
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });