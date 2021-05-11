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