import Moment from "react-moment";
import {  Modal , Button  } from "react-bootstrap";
import React, { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RemoveProduct } from "../../store/ProductStore";
import { AppActions } from "../../store/AppStore";


function Dashboard() {

    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(AppActions.setAdminPage())
      return () => {
        dispatch(AppActions.setNormalPage());
      };

    
    }, [dispatch])
    const products = useSelector(state => state.Products.product)
    const [productId, setProductID] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setProductID(id);
    setShow(true);
  };
  const handleRemove = ()=>{
      dispatch(RemoveProduct(productId))
    setShow(false)
  }
    return (
        <div>
          <div className="d=flex">
<Link to="/dashboard/Add"  > <Button variant="primary"  > add Products </Button> </Link>
<Link to="/dashboard/OrderProducts"  > <Button variant="primary"  > view Orders </Button> </Link>  

</div>

              <table className="table table-striped table-bordered  ">
            <thead>
              <tr>
                <th>Created</th>
                <th>title</th>
                <th>price</th>
              </tr>
            </thead>
            <tbody>
               {
                   products &&
                   products.map(product=>(
                    <tr key={product._id}>
                    <td>  <Moment to={product.createdAt}></Moment></td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td className="btn btn-info btn-lg mr-2 w-25"
                    onClick={() => {
                        history.push(`/dashboard/Edit/${product._id}`);
                      }}
                    >edit</td>
                    <td className="btn btn-danger btn-lg mr-2 w-25 fw-700"
                       onClick={()=>handleShow(product._id)}
                    >remove</td>
                    </tr>
                   ))
               }
             
            </tbody>
          </table>
          <Modal animation show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Are you sure ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Click Remove if you want to remove this Product !
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemove}>
            Remove
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
            
        </div>
    )
}

export default Dashboard
