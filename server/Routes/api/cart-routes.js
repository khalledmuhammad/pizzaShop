const {Cart } = require("../../models/cart-model")
const express = require("express");
let router = express.Router();
require("dotenv").config();
const { grantAccess } = require("../../middelware/roles");
 const {CheckUserExist} = require("../../middelware/auth")

  
   //create cart 
   router.route("/Create-cart")
   .post(CheckUserExist , grantAccess( "createOwn","cart"), async( req,res)=>{
     try {
          
       const cart = new Cart({product : req.body.id , totalPrice :req.body.totalPrice , user:req.user._id })
       const result = await cart.save()
 
       res.status(200).json(result)
    res.send(req.body.userId)
     } catch (error) {
       res.status(400).json({ message: "can't add cart please try again", error: error });
 
     }
   })
   
 
   //update prodcut
 
   router.route("/:cid")
   .get(CheckUserExist, grantAccess( "readOwn","cart") ,async(req,res)=>{
     try {
         const _id = req.params.cid;
         const cart = await Cart.findById(_id).populate('product');
         if(!cart|| cart.length === 0) return res.status(400).json("cart not found")
         res.status(200).json(cart)
     } catch (error) {
         res.status(400).json({ message: "can't get cart please try again", error: error });
 
     }
 })
 .patch(CheckUserExist, grantAccess( "updateOwn","cart") ,async(req,res)=>{
     try {
         const _id = req.params.cid;
         const cart = await Cart.findOneAndUpdate({_id} , {
             $set : {
                 ...req.body
             }
         } , {new : true});
         if(!cart) return res.status(400).json("cart not found")
         res.status(200).json(cart)
     } catch (error) {
         res.status(400).json({ message: "can't update cart please try again", error: error });
 
     }
 })
  .delete(CheckUserExist, grantAccess( "deleteOwn","cart") ,async(req,res)=>{
 
     try {
         const _id = req.params.cid;
         const cart = await Cart.findByIdAndRemove(_id)
         if(!cart) return res.status(400).json("cart not found")
         res.status(200).json("cart deleted successfully")
 
     } catch (error) {
         res.status(400).json({ message: "can't delete cart please try again", error: error });
 
     }
  })

  //user get own cart
  router.route("/find/:Uid")
   .get(CheckUserExist, grantAccess( "readOwn","cart") ,async(req,res)=>{
     try {
         const cart = await (await Cart.find({user : req.params.Uid})
         .populate("user" , "email role")
         .populate('product' , 'title')
         )
         if(!cart|| cart.length === 0) return res.status(400).json("cart not found")
         res.status(200).json(cart)
     } catch (error) {
         res.status(400).json({ message: "can't add cart please try again", error: error });
 
     }
 })

 router.route("/carts/getall")
 .get(CheckUserExist, grantAccess( "readAny","cart") ,async(req,res)=>{
   try {
       const cart = await Cart.find().populate("product")
        
       if(!cart|| cart.length === 0) return res.status(400).json("cart not found")
       res.status(200).json({cart , amount : cart.length})
   } catch (error) {
       res.status(400).json({ message: "can't get all carts please try again", error: error });

   }
})

 
 
 
module.exports = router;
