const express = require("express");
const { getImagebyId } = require("../db/imageUrl");
const router = express.Router()

router.get("/", async (req, res, next) => {
    const productImage = await getImagebyId();
  console.log(productImage," API router check Product")
    res.send(product);
  });



module.exports = router