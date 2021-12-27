const {Product } = require("../../models/products-model")
const express = require("express")
let router = express.Router();
require("dotenv").config();
const { grantAccess } = require("../../middelware/roles");
 const {CheckUserExist} = require("../../middelware/auth")
 const { sortArgsHelper } = require('../../config/helpers');
 const path = require("path")


  //create product 
  router.route("/Create-product")
  .post(CheckUserExist , grantAccess( "createAny","product"), async( req,res)=>{
    try {
      const product = new Product({...req.body})
      const result = await product.save()

      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ message: "can't add product please try again", error: error });

    }
  })
  //get products not auth needed public for all 
  router.route("/getAll-products")
  .post(async(req,res)=>{
    try{
      let sortArgs = sortArgsHelper(req.body)

      const product = await Product
      .find({})
      .sort([[sortArgs.sortBy,sortArgs.order]])
      .skip(sortArgs.skip)
      .limit(sortArgs.limit);
      
      res.status(200).json({product, count : product.length})
  } catch(error){
      console.log(error)
      res.status(400).json({message:'Error getting products',error});
  }
})

  router.route("/get-product/:pId")
  .get(async(req,res)=>{
      try {
          const _id = req.params.pId;
          const product = await Product.find({_id });
          if(!product|| product.length === 0) return res.status(400).json("product not found")
          res.status(200).json(product)
      } catch (error) {
          res.status(400).json({ message: " error getting product", error: error });
  
      }
  })

  //update prodcut

  router.route("/admin/:pid")
  .get(CheckUserExist, grantAccess( "readAny","product") ,async(req,res)=>{
    try {
        const _id = req.params.pid;
        const product = await Product.findById(_id);
        if(!product|| product.length === 0) return res.status(400).json("product not found")
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: "can't get product please try again", error: error });

    }
})
.patch(CheckUserExist, grantAccess( "updateAny","product") ,async(req,res)=>{
    try {
        const _id = req.params.pid;
        const product = await Product.findOneAndUpdate({_id} , {
            $set : {
                ...req.body
            }
        } , {new : true});
        if(!product) return res.status(400).json("product not found")
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: "can't update product please try again", error: error });

    }
})
 .delete(CheckUserExist, grantAccess( "deleteAny","product") ,async(req,res)=>{

    try {
        const _id = req.params.pid;
        const product = await Product.findByIdAndRemove(_id)
        if(!product) return res.status(400).json("product not found")
        res.status(200).json("product deleted successfully")

    } catch (error) {
        res.status(400).json({ message: "can't delete product please try again", error: error });

    }
 })

 //upload product image

router.route("/uploadImage")
.post(CheckUserExist, grantAccess( "updateAny","product") ,async(req,res)=>{
    try {
        
       if(!req.files){
           res.status(400).json("no photo")
       }
       const productImage = req.files.image
       if(!productImage.mimetype.startsWith('image')){
        res.status(400).json("upload photo")
       }
       const MXS = 1024*1024
       if(productImage.size>MXS){
        res.status(400).json("upload photo smaller than 1MB")
    }
    const imagePath = path.join(__dirname , "../../public/upload/" + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(200).json({
        image : `upload/${productImage.name}`
    })


    } catch (error) {
        res.status(400).json({ message: "can't post image please try again", error: error });

    }
})




module.exports = router;
