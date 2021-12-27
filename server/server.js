const express = require("express")
 const bodyParser = require("body-parser")
 const mongoose = require("mongoose")
 require('dotenv').config();
 const morgan = require("morgan")
 const helmet = require("helmet");
 const USerRoutes = require('./Routes/api/User-routes')
 const ProductsRoutes = require('./Routes/api/Product-routes')
 const OrderRoutes = require('./Routes/api/order-routes')
 const CartRoutes = require('./Routes/api/cart-routes') 
 const fileUpload = require("express-fileupload")

 const {ValidateToken} = require("./middelware/auth")
 const app = express()

 const mongourl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

 mongoose.connect(mongourl  ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}, ()=>{
    console.log("conected to db")
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("tiny"))
app.use(helmet());
app.use(ValidateToken);

app.use(express.static("./public")) // make public folder available to use as a static asset
app.use(fileUpload())

app.use("/api/users",USerRoutes)
app.use('/api/product' , ProductsRoutes)
app.use("/api/order" , OrderRoutes)
app.use("/api/cart" , CartRoutes)





app.use(express.static('client/build'))

if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname , '../client', 'build' , 'index.html'))
    })
}else {
    app.get("/"  ,(req,res)=>{
        console.log(req.user)
        res.send("welcome from home page")
    })
}

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    
    console.log(`Server running on port ${port}`)
})