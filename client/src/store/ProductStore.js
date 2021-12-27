import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAuthedTokenProduct } from "../Utils/Helpers";
import axios from "axios";

const initialState = {
  selectedProduct: [] || null,
  
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    reciveproducts(state, action) {
      state.product = action.payload
    },
  
    RecieveNewproduct(state, action) {
      state.product.push(action.payload);
    },
    AddSelected(state, action) {
      state.selectedProduct = action.payload;
    },
    ClearSelected(state) {
      state.selectedProduct = [];
    },
   
    upDataproduct(state, action) {
      console.log(action.payload)
      return {
        ...state,
        product : state.product.find((item)=>item._id === action.payload._id)
     
      
       
      };
    },
    removeproduct(state, action) {
      return{
        ...state ,
    
            product: state.product.filter((item) => item._id !== action.payload)
     
      }
    },
  },
});

export const RecieveProducts = (initialSort) => {
  return async (dispatch) => {
    try {
      await fetch("api/product/getAll-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialSort),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.error(data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
           

            dispatch(productsActions.reciveproducts(data.product));
        
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};


export const PostProduct = (product) => {
  return async (dispatch) => {
    try {
     const request = await axios.post(
        `/api/product/Create-product`,
        {
          title : product.title,
          desc : product.desc,
          price : product.price
        },
        getAuthedTokenProduct()
      );
    const Products = request.data; 
    console.log(Products);

      dispatch(productsActions.RecieveNewproduct(Products));

      toast.success("product posted  Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
};



export const RemoveProduct = ( _id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `/api/product/admin/${_id}`,
        getAuthedTokenProduct()
      );
      dispatch(productsActions.removeproduct(_id))
      toast.success("product Removed successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProduct = (_id)=>{
  return async (dispatch)=>{
    try {
    const request =  await axios.get(
        `/api/product/admin/${_id}`,
        getAuthedTokenProduct()
      );
      dispatch(productsActions.AddSelected(request.data))
     
   
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const updateProduct = (product , _id)=>{
  return async (dispatch)=>{
    try {
    const request =  await axios.patch(
        `/api/product/admin/${_id}`,
        product,
        getAuthedTokenProduct()
      );
  //   dispatch(productsActions.upDataproduct(request.data , _id))
     
   
    } catch (error) {
      console.log(error.message);
    }
  }
}
export const viewProduct = (pid) => {
  return async (dispatch) => {
    try {
      await fetch(`/api/product/get-product/${pid}`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.error("product not found or deleted", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            dispatch(productsActions.AddSelected(data));
          }
        });
    } catch (error) {
      console.log("sorry" + error);
    }
  };
};


export const productsActions = products.actions;
export default products.reducer;
