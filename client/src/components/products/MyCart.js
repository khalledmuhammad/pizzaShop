import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/CartStore";
import classes from "./myCart.module.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function MyCart({ items }) {
  const dispatch = useDispatch();

  return (
    <div className={classes.cartItem}>
      <h2>{items.title}</h2>
      <div className={classes.summary}>
        <span className={classes.price}>${items.price}</span>
        <span className={classes.amount}>x {items.amount}</span>
      </div>
      <div className={classes.actions}>
        <button
          onClick={() => dispatch(cartActions.DecreasItems({ id: items.id }))}
        >
          {" "}
          −
        </button>
        <button
          onClick={() => dispatch(cartActions.IncreaseItems({ id: items.id   }))}
        >
          +
        </button>
        <button
          onClick={() => dispatch(cartActions.RemoveCart({ id: items.id }))}
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}

export default MyCart;
