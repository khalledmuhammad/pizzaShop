import React, { useState, useEffect  } from "react";
import {  useDispatch } from "react-redux";
import { useHistory , useParams } from "react-router";
import { getProduct, updateProduct } from "../../store/ProductStore";
import { toast } from "react-toastify";
import { AppActions } from "../../store/AppStore";




function EditProduct() {
   const params = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const[title , setTitle] = useState("")
    const[desc , setDesc] = useState("")
    const[price , setPrice] = useState("")
    useEffect(() => {
      dispatch(AppActions.setAdminPage())
      return () => {
        dispatch(AppActions.setNormalPage());
      };

    
    }, [dispatch])
    useEffect(() => {
        dispatch(getProduct(params.pid))
        
    }, [dispatch , params.pid])
    const SubmitHandler=(e)=>{
        e.preventDefault()  
        if(title.trim()  === "" ||  desc.trim() === "" || price.trim()===""){
            toast.error("please add all the edited values");
            return
          }       
        dispatch(updateProduct( {title, desc, price} ,params.pid))
        history.push("/dashboard")
    }

    return (
        <form onSubmit={SubmitHandler} className='d-flex w-100 align-items-sm-center  justify-content-center flex-sm-column  ' >
  <div className="form-group">
    <input type="text" onChange={(e)=>setTitle(e.target.value)}  className="form-control mb-2"placeholder="Enter title" />
    <textarea type="text"  onChange={(e)=>setDesc(e.target.value)} className="form-control mb-2"placeholder="Enter description" />
    <input type="number"  onChange={(e)=>setPrice(e.target.value)} className="form-control "placeholder="Enter Price $" />


  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    )
}

export default EditProduct
