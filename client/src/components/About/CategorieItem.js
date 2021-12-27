import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex:1;
    margin: 3px;
    height: 70vh;
    position: relative;
    
`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 3%;
        
`
const Info = styled.div`
top:0;
left: 0;
 position: absolute;
 width: 100%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 z-index: 10;
`
const Title = styled.h1`
color:white;
margin-bottom: 20px;

`
const Button = styled.button`
    border : none;
    padding : 10px;
    font-weight: 600;
    color:grey;
    background-color:white ;
    cursor: pointer;
    &:hover{
        color: white;
        background-color:teal;
    }
`


function CategorieItem({item }) {
    return (
        <Container>
            <Image src={item.image} />
         <Info>
         <Title> {item.title} </Title>
            <Button>Shop Now</Button>
             </Info>   
        </Container>
    )
}

export default CategorieItem
