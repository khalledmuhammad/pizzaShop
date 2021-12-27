import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
  loggedIn: null,
  cartPage : false,
  adminPage : false
};

const App= createSlice({
  name: "app",
  initialState,
  reducers: {
   

    setLoggedin(state){
        state.loggedIn = true
    },  

    setLogOut(state){
      state.loggedIn = false
  } ,
  setAdminPage(state){
    state.adminPage = true
  } ,
  setCartPage(state){
    state.cartPage = true
  } ,
  setMainLayout(state){
    state.adminLayout = false
  } ,
  setNormalPage(state){
    state.adminPage = false
    state.cartPage = false
  }
  },
});
export const AppActions = App.actions;
export default  App.reducer;
