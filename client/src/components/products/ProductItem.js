import { Button } from "@mui/material";
import { toast } from "react-toastify";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { productsActions, viewProduct } from "../../store/ProductStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./productItem.css";
import {  RecieveCart } from "../../store/CartStore";
import {AppActions} from "../../store/AppStore"


function ProductItem() {
    const loggedIn = useSelector((state) => state.App.loggedIn);
    const dispatch = useDispatch();
    const history = useHistory()


 useEffect(() => {
    dispatch(AppActions.setAdminPage())
    return () => {
      dispatch(AppActions.setNormalPage());
    };

  
  }, [dispatch])

    
  const amountInput = useRef();
  const SelectedProduct = useSelector(
    (state) => state.Products.selectedProduct
  );

  const params = useParams();
  useEffect(() => {
    dispatch(viewProduct(params.pid));
    return () => {
      dispatch(productsActions.ClearSelected());
    };
  }, [dispatch, params]);

  return (
    <>
      {SelectedProduct.map((SelectedProduct) => (
        <div className="meal" key={SelectedProduct._id}>
          <h3>{SelectedProduct.title} </h3>
          <p className="description">{SelectedProduct.desc}</p>
          <span className="price">{SelectedProduct.price}$</span>
          <div className="d-flex">
            <label className="mr-1 ">Amount</label>
            <input
              label="Amount"
              ref={amountInput}
              id="amount"
              type="number"
              min="1"
              max="5"
              step="1"
              defaultValue="1"
            />
          </div>
        { loggedIn &&  <Button
            variant="contained"
            className="mt-2"
            onClick={() => {
              const amountEntered = amountInput.current.value;
              if (  amountEntered > 5 || amountEntered <= 0 ) {
                toast.error("please don't add more than 5 items at ones", {
                  position: toast.POSITION.TOP_CENTER,
                });
                return;
              }
              console.log(
                amountEntered,
                SelectedProduct.price,
                SelectedProduct.title,
                SelectedProduct.desc
              );
 dispatch(RecieveCart({amount : Number(amountEntered) , id : SelectedProduct._id  ,price : SelectedProduct.price ,title :  SelectedProduct.title  }))

 history.push("/CartItem")
}}

          >
           
            add to cart
            <ShoppingCartIcon />
          </Button>}
        </div>
      ))}
    </>
  );
}

export default ProductItem;
