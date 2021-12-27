import React , {useState} from 'react'
import {   NavLink } from "react-router-dom";
import {Link} from "react-scroll"
import styled from "styled-components"
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';
import { useDispatch , useSelector } from "react-redux";
import {  useHistory  } from 'react-router-dom'
import {LogOutUser} from "../../store/userStore"
import PizzaImg from "../assets/pizza.jpg"




function Navbar() {
  const CartAmount = useSelector(state => state.Carts.quantity)
  const CartPage = useSelector(state => state.App.cartPage)
  const AdminPage = useSelector(state => state.App.adminPage)

  
    const [extendNavbar , setextendNavbar] = useState(false)
    const loggedIn = useSelector((state) => state.App.loggedIn);
    const userRole = useSelector(state=>state.Users.user.role)
    const dispatch = useDispatch()
    const history= useHistory()

    return ( 
      <>
        <NavbarContainer  extendNavbar={extendNavbar}>
         
            <NavbarInnerContainer>
            <Left>
                <MenuItem>
                <h1 style={{ fontFamily:" Montserrat, sans-serif" , color:"white"}}>
                  <NavLink className="navlinks" to="/" > MyShop</NavLink>  
                </h1>
                </MenuItem>
            <OpenLinksButton
              onClick={() => {
                setextendNavbar(!extendNavbar);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
            
            </Left>

            <Center>
               {
                 !AdminPage && !CartPage && 
                 <>
               
               <Link   className="navlinks"  spy={true} smooth={true} duration={500}  to="about">
                    Home
                </Link >
                <Link className="navlinks" spy={true} smooth={true} duration={500}  to="products">
                    Products
                </Link >
               
                </>
                }
                {
                  loggedIn && userRole ==="admin" ? 
                  <NavLink activeClassName="active" className="navlinks" exact to="/dashboard">
     Admin 
     </  NavLink>
                  : null
                }

            </Center>
            <Right>
       { !loggedIn  &&  
       <>
           
            <NavLink activeClassName="active" className="navlinks" to="/auth">
     SignIn 
     </  NavLink>
             <KeyTwoToneIcon/>
           
            </>
}
            
         {loggedIn && 
         <>
          <Badge className="badge"  badgeContent={CartAmount} color="primary">
           <div onClick={()=>history.push('/CartItem')}><ShoppingCartTwoToneIcon /></div> 
            </Badge>
     <NavLink activeClassName="active" className="navlinks" to="/auth" onClick={()=> {
                
                dispatch(LogOutUser())
                  history.replace("/auth")
                } }>
                  SignOut
                    </NavLink> 
                    <LogoutIcon/>
                    </>
}

      
         
           
           
          
 </Right>
           
            </NavbarInnerContainer>
            {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="about" onClick={()=> setextendNavbar(!extendNavbar)}> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="products" onClick={()=> setextendNavbar(!extendNavbar)}> Products</NavbarLinkExtended>
          {
                  loggedIn && userRole ==="admin" ? 
                  <NavLink activeClassName="active" onClick={()=> setextendNavbar(!extendNavbar)} className="navlinks" exact to="/dashboard">
     Admin 
     </  NavLink> : null
}
        </NavbarExtendedContainer>
      )}
        </NavbarContainer>
        <Mainimage>
          <img src={PizzaImg} alt="pizza to eat" />
        </Mainimage>
        </>
    )
}

export default Navbar

const NavbarContainer = styled.nav`
    background-color: rgb(16,43,73);
    width: 100%;
   
    color: white;
    border-bottom: 1px solid #102b49;
    display: flex;
    position:fixed;
    z-index: 100;
    flex-direction: column;
    box-shadow: 3px 13px 17px -2px rgba(0,0,0,0.2);

    height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};

    justify-content: space-between;
    @media (min-width: 700px) {
    height: 80px;
    
  }

 
`

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  
`;

const Left = styled.nav`
       flex:1;
    display: flex;
    align-items: center;
    .navlinks{

color: white;
text-decoration: none;
margin-left: 10px;
font-weight: bold;
&:hover,:active{
    color:#59b0e2;
}}
   
`
const Center = styled.nav`
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
      
        .navlinks{

            color: white;
            cursor: pointer;
            text-decoration: none;
            margin-left: 10px;
            font-weight: bold;
            &:hover,:active{
                color:#59b0e2;
            }
            @media (max-width: 700px) {
    display: none;
  }

        }
        .active{
            color:#59b0e2;
        }
        
   
`
const Right = styled.nav`
    flex:1;
    width:100%;
    
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 30px;
    padding-left: 10px;
          .navlinks{

      color: white;
      text-decoration: none;
      padding-left: 10px;
      font-weight: bold;
        &:hover,:active{
            color:#59b0e2;
        }

        }
        .active{
        color:#59b0e2;
        }
        .badge{
          cursor: pointer;
        }

        @media (max-width: 380px) {
      
        flex-direction: column;
        font-size: 8px;
        align-items: center;
        justify-content: center;
     
  }
   
`
const OpenLinksButton = styled.button`
  width: 70px;
  
  height: 50px;
  background: none;
  color: white;
  font-size: 45px;
  border : none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover, active{
                color:#59b0e2;
            }
 @media  screen and (max-width: 380px)
  {
       font-size: "12px";
   margin-left: "10px"
    }
`;
 const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .navlinks{

color: white;
text-decoration: none;
margin-left: 10px;
font-weight: bold;
&:hover,:active{
    color:#59b0e2;
}}
  @media (min-width: 700px) {
    display: none;
  }
`;
 const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 30px;
 
  

`;
const Mainimage = styled.div`
  width: 100%;
    height: 12rem;
    z-index: 0;
    overflow: hidden;
    img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
}

`;