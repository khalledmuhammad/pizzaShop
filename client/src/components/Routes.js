import React from 'react'
import {Switch , Route, Redirect } from "react-router-dom"
import Auth from './authenticate/Auth'
import { useSelector } from "react-redux";
import Home from './products/Home'
import Dashboard from './Admin/Dashboard'
import AddProduct from './Admin/AddProduct'
import EditProduct from './Admin/EditProduct'
import ProductItem from './products/ProductItem';
import CartItem from './products/CartItem';
import OrderProducts from './Admin/OrderProducts';
import Order from './products/Order';



function Routes() {
    const loggedIn = useSelector((state) => state.App.loggedIn);
    const userRole = useSelector(state=>state.Users.user.role)


    return (

        <>
        
        <Switch>
        <Route path="/"  exact component={Home} />
        <Route path="/auth"  component={Auth} />
        <Route path="/product/:pid" component={ProductItem} />
        <Route path="/CartItem" component={CartItem} />
        <Route path="/order" component={Order} />



        
        </Switch> 
        {   loggedIn && userRole ==="admin" ? 
        <Switch>
                <Route path="/dashboard" exact  component={Dashboard} />
                <Route path="/dashboard/Add"  component={AddProduct} />
                <Route path="/dashboard/OrderProducts"  component={OrderProducts} />
                <Route path="/dashboard/Edit/:pid"  component={EditProduct} />

                </Switch>

                : <Redirect to="/" />    }


           
      
            
            
           
        </>
   
    )
}

export default Routes
