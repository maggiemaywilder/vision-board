const Image = require("../models/Image.js");


module.exports = {
      addImage: async function(req, res) {
      const response = await Image.create({text: req.text, url: req.url})
        res.send(response)
      },
      deleteImage: async function(req, res) {
        const response = await Image.destroy({where: {id: req.id}}) //wont work needs id clarified
          res.send(response)
      },
      findAllImages: async function(req, res) {
        const response = await Image.findAll()
          res.send(response)
      }
}