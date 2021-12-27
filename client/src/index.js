import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from 'react-redux'
import UserReducer from './store/userStore'
import AppReducer from './store/AppStore'
import ProductReducer from './store/ProductStore';
import CartReducer from "./store/CartStore"
import OrderReducer from "./store/OrderStore"

const store = configureStore({
  reducer : {
    Users : UserReducer , 
    Products : ProductReducer,
    Carts : CartReducer,
    Orders : OrderReducer,
    App : AppReducer
  }
})





ReactDOM.render(
  <Provider store={store}>

  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

