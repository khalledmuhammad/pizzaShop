import React , {useEffect} from 'react'
import {  useDispatch , useSelector} from "react-redux";
import { AppActions } from '../../store/AppStore';
import { Row, Col, ListGroup  } from 'react-bootstrap'



function OrderProducts() {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(AppActions.setAdminPage())
      return () => {
        dispatch(AppActions.setNormalPage());
      };

    
    }, [dispatch])
    const Orders = useSelector(state => state.Orders.Orders)
    return (
      <Row>
      <Col  xs={1}> </Col>
      <Col  xs={10}>
      <ListGroup.Item>
      <ListGroup variant='flush'>
           { Orders &&
             Orders.map((user , index)=>(
              <ListGroup.Item key={index}>
              <Row>
               
               <Col>
               <h1>{user.user.firstname}</h1>
                    
                  </Col>
                  <Col md={4}>
<h1>                totalPrice :  {user.totalPrice}
</h1>                  </Col>
                  <Col md={4}>
                    {user.orderItems ? 
                      user.orderItems.map((item ,index )=>
                      <div key={index} className="d-flex flex-sm-row" >

                      <h1>{item.title}</h1>
                      <h5 className="ml-2 mr-2 text-info">  amount:{item.amount}</h5>
                      <h5 className="text-danger"> price:{item.price}$</h5>

                      </div>)
                      : null
                    }
                      
                   
                  </Col>
               </Row></ListGroup.Item>
               
             ))
           }
           </ListGroup>

       </ListGroup.Item>
       </Col>
       </Row>
    )
}

export default OrderProducts
