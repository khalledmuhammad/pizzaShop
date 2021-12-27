import React , {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {AppActions} from "../../store/AppStore"
import { Row, Col, ListGroup , Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { CreateOrder } from '../../store/OrderStore';



function Order() {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
       dispatch(AppActions.setAdminPage())
       return () => {
         dispatch(AppActions.setNormalPage());
       };
   
     
     }, [dispatch])


  const Cart = useSelector(state => state.Carts)
  const AddOrder=()=>{
    dispatch(CreateOrder({cartItem : Cart.cartItem , quantity : Cart.quantity , totalPrice : Cart.totalPrice }))
    history.push("/")


  }
    return (
        <Row>
        <Col  xs={1}> </Col>
        <Col  xs={10}>
        <ListGroup.Item>
        <h2>Ordered Items</h2>
        <h5 className="ml-2 mr-2 text-danger"> total:{Cart.totalPrice}$</h5>

        {Cart.cartItem.length === 0 ? (
          <h1>Order is empty</h1>
        ) : (
          <ListGroup variant='flush'>
            {Cart.cartItem.map((item, index) => (
            
              <ListGroup.Item key={index}>
                <Row>
                 
                  <Col>
                    <Link to={`/product/${item.id}`}>
                      {item.title}
                    </Link>
                  </Col>
                  <Col md={4}>
                    {item.amount} x ${item.price} = ${item.amount * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
              
           
            ))}
          </ListGroup>
          
        )}
      </ListGroup.Item>
      <Row>
      <Col xs={5}></Col>
      <Col> 
             <Button  onClick={AddOrder}>
                  proceed

              </Button>
              
              </Col>
              </Row>
     
      </Col>
      </Row>
    )
}

export default Order
