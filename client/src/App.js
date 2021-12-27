import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./components/Routes";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import { isAuthedUser } from "./store/userStore";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { RecieveProducts } from "./store/ProductStore";
import { getAllOrders, getOrderedItems } from "./store/OrderStore";

const initialSort = {sortBy:"_id",order:"asc",limit:8,skip:0};


function App() {
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state) => state.App.loggedIn);
  const userId = useSelector((state) => state.Users.user.id);

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    dispatch(isAuthedUser());
  }, [dispatch]);
  const IsAdmin = useSelector((state) => state.Users.user.role);

  useEffect(() => {
    if (isLoggedin != null) {
      if(IsAdmin === "user"){
      dispatch(getOrderedItems(userId))}
      if(IsAdmin === "admin")  dispatch(getAllOrders())


      setLoading(false);
    }

  }, [isLoggedin, IsAdmin , dispatch ,userId  ]);

  const products = useSelector((state) => state.Products.product);

  useEffect(() => {
    if (!products) {
      dispatch(RecieveProducts(initialSort));
    }
  }, [dispatch, products]);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <ToastContainer draggable={true} transition={Bounce} autoClose={1500} />
      {loading ? (
        <CircularProgress
          color="secondary"
          style={{ marginTop: "100px", marginLeft: "50vw" }}
        />
      ) : (
        <Routes />
      )}
    </>
  );
}

export default App;
