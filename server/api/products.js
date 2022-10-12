const express = require("express");
const router = express.Router()
const { getAllProducts, createProduct, getProductById, destroyProduct, updateProduct, getProductsByName, getProductsByCategoryGrind, getProductsByCategoryRoast, getProductsByCategoryCountry, getProductsByCategoryWeight, getAllImageProducts } = require("../db/Product");
const { createImage, updateImageUrl, getImagebyId, destroyImage } = require('../db/imageUrl')
const { requireMerchant } = require("./utils");



router.get("/", async (req, res, next) => {
  console.log("getting products")
    const product = await getAllImageProducts();
  console.log(product," API router check Product")
    res.send(product);
  });

  router.post("/", requireMerchant, async (req,res,next) => {

      const {creatorId, name, description, price, inventory, roast, grind, country, product_wt, image} = req.body
      console.log(image,"show me the image")
      const imageId = await createImage(image)
      console.log(imageId.id, "Creating image? hopefully")
      const productData = {
        creatorId: req.merchant.id, name, description, price, inventory, roast, grind , inventory, country, product_wt, image: imageId.id,

      }
      try {
          const product = await createProduct(productData)
          if (product) {
              res.send(product)
          } else {
              next({
                  name: 'ErroCreating',
                  message: 'Error creating Product'
              })
          }
      } catch ({name, message}) {
          next({name, message})
      }
  })

  router.delete('/:productId', requireMerchant, async (req,res,next)=> {
      const {productId} = req.params
      try {
          const product = await getProductById(productId)
          if (product && product.creatorId === req.merchant.id) {
            console.log(product.image,"show me the image being deleted")
            const deletedImage = await getImagebyId(product.image);
              await destroyProduct(productId);
              await destroyImage(deletedImage.id)
              res.send(product)
          } else {
            res.status(403);
            next({
              name: "MissingUserError",
              message: `User ${req.merchant.username} is not allowed to delete this post.`,
            });
          }
      } catch ({name,message}) {
          next({name, message})
      }
  })

  router.patch("/:productId", requireMerchant, async (req,res,next) => {
    const {productId} = req.params;
    const {creatorId, name, description, price, inventory, roast, grind, country, product_wt, image} = req.body
    const originalProductId = await getProductById(productId);
    console.log( name, image, "show me this stuff product")
    console.log(originalProductId.image,"Show me the product")
    const originalProductName = await getProductsByName(name);
    try {
      if (!originalProductId) {
        next({
          name: "NoProductFound",
          message: `Product ${productId} not found`,
        });
      } else if (originalProductName) {
          next({
              name: "FailedToUpdate",
              message: `An Product with name ${name} already exists`,
          });
          
      } else if (originalProductId.image == null) {
        console.log("Intiating image creation via update")
        const imageId = await createImage(image)
        const updatedProduct = await updateProduct({productId,
          creatorId: req.merchant.id,
          name, description, price, inventory, roast, grind, country, product_wt, image: imageId.id
        });
          
          res.send(updatedProduct);
    } else {
      const url = image
      console.log(originalProductId.image, image, "intiating update product")
      const imagesId = await updateImageUrl(originalProductId.image, {url})
      console.log(imagesId,"grabbed image")

        const updatedProduct = await updateProduct({productId,
          creatorId: req.merchant.id,
          name, description, price, inventory, roast, grind, country, product_wt, image: imagesId.id,
        });
          
          res.send(updatedProduct);
        } 
      } catch (error) {
          next (error)
      }
  })

  router.get('/:productId', async (req,res,next )=> {
    const {productId} = req.params
    const getProduct = await getProductById(productId)
    res.send(getProduct)
  })

  router.get('/grind/:grind', async (req,res,next )=> {
    const {grind} = req.params
    console.log(grind,"Show me the API call")
    const getProduct = await getProductsByCategoryGrind(grind)
    res.send(getProduct)
  })
  router.get('/roast/:roast', async (req,res,next )=> {
    const {roast} = req.params
    const getProduct = await getProductsByCategoryRoast(roast)
    res.send(getProduct)
  })
  router.get('/:country', async (req,res,next )=> {
    const {country} = req.params
    const getProduct = await getProductsByCategoryCountry(country)
    res.send(getProduct)
  })
  router.get('/weight/:weight', async (req,res,next )=> {
    const {productwt} = req.params
    const getProduct = await getProductsByCategoryWeight(productwt)
    res.send(getProduct)
  })
  module.exports = router