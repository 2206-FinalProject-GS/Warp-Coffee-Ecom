const express = require("express");
const router = express.Router()
const { getAllProducts, createProduct, getProductById, destroyProduct, updateProduct, getProductsByName, getProductsByCategoryGrind, getProductsByCategoryRoast, getProductsByCategoryCountry, getProductsByCategoryWeight } = require("../db/Product");
const { requireMerchant } = require("./utils");



router.get("/", async (req, res, next) => {
    const product = await getAllProducts();
  console.log(product," API router check Product")
    res.send(product);
  });

  router.post("/", requireMerchant, async (req,res,next) => {

      const {creatorId, name, description, price, inventory, roast, grind, country, product_wt} = req.body
      const productData = {
        creatorId: req.merchant.id, name, description, price, inventory, roast, grind , inventory, country, product_wt

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
              await destroyProduct(productId)
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
    const {creatorId, name, description, price, inventory, roast, grind, country, product_wt} = req.body
    const originalProductId = await getProductById(productId);
    const orginalProductName = await getProductsByName(name);
    try {
      if (!originalProductId) {
        next({
          name: "NoProductFound",
          message: `Product ${productId} not found`,
        });
      } else if (orginalProductName) {
          next({
              name: "FailedToUpdate",
              message: `An Product with name ${name} already exists`,
          });
      } else {
        const updatedProduct = await updateProduct({productId,
          creatorId: req.merchant.id,
          name, description, price, inventory, roast, grind, country, product_wt
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

  router.get('/grind=:grind', async (req,res,next )=> {
    const {grind} = req.params
    const getProduct = await getProductsByCategoryGrind(grind)
    res.send(getProduct)
  })
  router.get('/roast=:roast', async (req,res,next )=> {
    const {roast} = req.params
    const getProduct = await getProductsByCategoryRoast(roast)
    res.send(getProduct)
  })
  router.get('/country=:country', async (req,res,next )=> {
    const {country} = req.params
    const getProduct = await getProductsByCategoryCountry(country)
    res.send(getProduct)
  })
  router.get('/weight=:weight', async (req,res,next )=> {
    const {productwt} = req.params
    const getProduct = await getProductsByCategoryWeight(productwt)
    res.send(getProduct)
  })
  module.exports = router