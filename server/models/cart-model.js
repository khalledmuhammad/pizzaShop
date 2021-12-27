const mongoose = require('mongoose');
const { Schema } = mongoose;


const CartSchema = mongoose.Schema({

  //the id i send will be an pbject id not a string and will be part of the ref collection 
  //y3ny ana hb3t 10 htygy hna objectId("10") from the USer collection

  user: { //search collection user and get its id 
    type: Schema.Types.ObjectId,
    required : true,
    ref: 'User'
  },

  product :  { //search collection product and get its id
          type: Schema.Types.ObjectId,
          ref: 'Product'
        }, 
  totalPrice: {
          type: Number,
          default: 0
        },          
     
  },
  { timestamps: true}
  )

const Cart =  mongoose.model("Cart" , CartSchema)
module.exports = {Cart}