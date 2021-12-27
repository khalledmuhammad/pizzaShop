import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAuthedTokenProduct } from "../Utils/Helpers";
import axios from "axios";

const initialState = { 
  
};

const Order= createSlice({
  name: "order",
  initialState,
  reducers: {
    RecieveOrders(state,action){
      state.Orders = action.payload.Orders

    },
 /*    removeOrder(state,action){
      console.log(action.payload.id)
       state.filter(item => item._id !== action.payload.id ) 


    } */
  }
   

});

export const CreateOrder = (item) => {
    return async (dispatch) => {
      try {
       const request = await axios.post(
          `/api/order/Create-order`,
          {
            orderItems : item.cartItem,
            

            quantity : item.quantity , 
            totalPrice : item.totalPrice ,
          },
          getAuthedTokenProduct()
        );

        console.log(request.data)
  
        toast.success("Order added  Successfully");
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const getOrderedItems = (uid) => {
    return async (dispatch) => {
      try {
  
        const request = await axios.get(
          `/api/order/find/${uid}`,
        
          getAuthedTokenProduct()
        );
        console.log(request.data)
        
      } catch (error) {
        console.log(error);
      }
    };
  }; 
  
  export const getAllOrders = () => {
    return async (dispatch) => {
      try {
  
        const request = await axios.get(
          `/api/order/orders/getall`,
        
          getAuthedTokenProduct()
        );
        console.log(request.data)
        dispatch(orderActions.RecieveOrders({ Orders : request.data.order , User : request.data.order.user }))

        
      } catch (error) {
        console.log(error);
      }
    };
  }; 
   
export const orderActions = Order.actions;
export default  Order.reducer;
