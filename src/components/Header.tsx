import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';


const HeaderBlock = styled.div`
    background:white;
    height:5rem;
    font-size:3rem;
    font-weight:600;
`
const Title = styled.div`
    float:left;
    margin-left:1rem;
`

function Header(props){
  return (
  <HeaderBlock>
  <Title>{props.title}</Title>
  {props.children}
  </HeaderBlock>
    )
};

export default Header