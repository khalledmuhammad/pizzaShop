import React , {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {AppActions} from "../../store/AppStore"
import MyCart from './MyCart';
import classes from "./cartitem.module.css";
import { useHistory } from 'react-router-dom';






function CartItem() {

  const history = useHistory()
  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(AppActions.setAdminPage())
    return () => {
      dispatch(AppActions.setNormalPage());
    };

  
  }, [dispatch])
  const CartItem = useSelector(
    (state) => state.Carts
  );
    return (
        <div  className='text-center d-flex flex-column justify-content-center align-items-center w-100' >
            <h1 className={classes.orderBtn}>totalPrice :{ `${CartItem.totalPrice} `=== 0 ?` ${CartItem.totalPrice}` :` ${CartItem.totalPrice}$`  } </h1>
            <h3 className={classes.orderBtn}> products :  {CartItem.quantity}</h3>
            {
                CartItem.cartItem.map(items=>(
                  <MyCart key={items.id} items={items} />
 
                ))
            }
            <button className={classes.orderBtn} onClick={()=>{history.replace("/order")}} > Order</button>
            
        </div>
    )
}

export default CartItem
