 const {Order } = require("../../models/order-model")
 const express = require("express");
 let router = express.Router();
require("dotenv").config();
const { grantAccess } = require("../../middelware/roles");
 const {CheckUserExist} = require("../../middelware/auth")

   //create order 
   router.route("/Create-order")
   .post(CheckUserExist , grantAccess( "createOwn","order"), async( req,res)=>{
     try {
        const {
            orderItems,
            quantity,
            totalPrice,
          } = req.body
        
          if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: "no ordered items", error: error });

             return 
          }
           else {
            const order = new Order({
              orderItems,
              user: req.user._id,
              quantity,
              totalPrice
            })
            const result = await order.save()
            res.status(200).json(result)

        }
        
 
    

     } catch (error) {
       res.status(400).json({ message: "can't add order please try again", error: error });
 
     }
   })
   
 
   //update prodcut
 
   router.route("/:oid")
   .get(CheckUserExist, grantAccess( "readOwn","order") ,async(req,res)=>{
     try {
         const _id = req.params.oid;
         const order = await Order.findById(_id);
         if(!order|| order.length === 0) return res.status(400).json("order not found")
         res.status(200).json(order)
     } catch (error) {
         res.status(400).json({ message: "can't get order please try again", error: error });
 
     }
 })
 .patch(CheckUserExist, grantAccess( "updateOwn","order") ,async(req,res)=>{
     try {
         const _id = req.params.oid;
         const order = await Order.findOneAndUpdate({_id} , {
             $set : {
                 ...req.body
             }
         } , {new : true});
         if(!order) return res.status(400).json("order not found")
         res.status(200).json(order)
     } catch (error) {
         res.status(400).json({ message: "can't update order please try again", error: error });
 
     }
 })
  .delete(CheckUserExist, grantAccess( "deleteOwn","order") ,async(req,res)=>{
 
     try {
         const _id = req.params.oid;
         const order = await Order.findByIdAndRemove(_id)
         if(!order) return res.status(400).json("order not found")
         res.status(200).json("order deleted successfully")
 
     } catch (error) {
         res.status(400).json({ message: "can't delete order please try again", error: error });
 
     }
  })

  //user get own orders
  router.route("/find/:Uid")
   .get(CheckUserExist, grantAccess( "readOwn","order") ,async(req,res)=>{
     try {
         const order = await Order.find({user : req.params.Uid}).populate('user');
         if(!order|| order.length === 0) return res.status(400).json("order not found")
         res.status(200).json({order , amount : order.length })
     } catch (error) {
         res.status(400).json({ message: "can't add order please try again", error: error });
 
     }
 })

 router.route("/orders/getall")
 .get(CheckUserExist, grantAccess( "readAny","order") ,async(req,res)=>{
   try {
       const order = await Order.find()
       .populate("user" , "firstname email")
       if(!order|| order.length === 0) return res.status(400).json("order not found")
       res.status(200).json({order , amount : order.length})
   } catch (error) {
       res.status(400).json({ message: "can't get all orders please try again", error: error });

   }
})

 
 
 module.exports = router;
