import { createSlice } from "@reduxjs/toolkit";
import { getAuthedTokenProduct } from "../Utils/Helpers";
import axios from "axios";

const initialState = {
  cartItem: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
 
  totalPrice: localStorage.getItem("totalPrice")
  ? JSON.parse(localStorage.getItem("totalPrice"))
  : 0,

  quantity: localStorage.getItem("quantity")
  ? JSON.parse(localStorage.getItem("quantity"))
  : 0,
  
};

const cart = createSlice({
  name: "carts",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const item = action.payload
      const UPtotalPrice = state.totalPrice + item.price * item.amount
      const existItem = state.cartItem.find(x=>x.id ===item.id)
      const itemIndex = state.cartItem.findIndex(x=>x.id ===item.id)

      if(existItem){
         
          state.cartItem[itemIndex].amount = state.cartItem[itemIndex].amount + item.amount 

          state.totalPrice =UPtotalPrice
       
      } else{
       
           state.cartItem.push(item)
          state.totalPrice =UPtotalPrice
          
          state.quantity = state.quantity+1
 }
 localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
 localStorage.setItem("quantity", JSON.stringify(state.quantity));
 localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));



    },

    RemoveCart(state,action){
      const itemIndex = state.cartItem.findIndex(x=>x.id ===action.payload.id)
      const FilteredCart = state.cartItem.filter(item => item.id !== action.payload.id ) 

      state.totalPrice =state.totalPrice - state.cartItem[itemIndex].price *state.cartItem[itemIndex].amount 
      state.quantity = state.quantity-1
      state.cartItem = FilteredCart
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem("quantity", JSON.stringify(state.quantity));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

    },
    IncreaseItems(state,action){
      const itemIndex = state.cartItem.findIndex(x=>x.id ===action.payload.id)

      state.cartItem[itemIndex].amount = state.cartItem[itemIndex].amount  + 1
      console.log(action.payload.price)
      state.totalPrice =state.totalPrice + state.cartItem[itemIndex].price 
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

    },
    DecreasItems(state,action){
      const itemIndex = state.cartItem.findIndex(x=>x.id ===action.payload.id)
      if(state.cartItem[itemIndex].amount > 0){
        state.cartItem[itemIndex].amount = state.cartItem[itemIndex].amount - 1
        
        state.totalPrice =state.totalPrice - state.cartItem[itemIndex].price 
      }
     
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

    }
    
   
  },
});

 export const RecieveCart = ({amount, id , price , title}) => {
  return async (dispatch , getState ) => {
    
    let productPrice =    price * amount; 
    
    try {
     

      const request = await axios.post(
        `/api/cart/Create-cart`,
        {
         id   ,
         totalPrice : productPrice
        
        },
        getAuthedTokenProduct()
      );
      
      dispatch(cartActions.AddToCart({ amount, id , price , title}));
      console.log(request.data)

    } catch (error) {
      console.log(error);
    }
  };
}; 
export const getCartItems = (uid) => {
  return async (dispatch) => {
    try {

      const request = await axios.get(
        `/api/cart/find/${uid}`,
      
        getAuthedTokenProduct()
      );
      console.log(request.data)
      
    } catch (error) {
      console.log(error);
    }
  };
}; 



export const cartActions = cart.actions;
export default cart.reducer;
