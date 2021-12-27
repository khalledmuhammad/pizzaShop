import React from 'react'
import { useSelector , } from "react-redux";
import Grid from '@mui/material/Grid'
import FoodCard from "../../Utils/FoodCard"
function Products() {

  const products = useSelector(state => state.Products.product);

    

 

    return (
     
           
           <div id="products"  style={{marginTop : "80px" , display:"flex" , width:"100%" , height:"100vh" }} >
       
       <Grid style={{margin : " 0 20px 0 20px" }}   alignItems="center"
  justifyContent="center" container spacing={2}>
  
    {  products   ? 
     products.map(products=>{
         return <Grid  key={products._id} item xs={12}   sm={6} lg={3}>
            <FoodCard product={products} />
         </Grid>
      }) : null
 
   } 
      </Grid>
           

     
        </div>
        
    )
}

export default Products

  

 