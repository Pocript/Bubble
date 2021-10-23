import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

const BubbleBlock = styled.div`
    text-align:left;
    clear:both;
    margin-top:1rem;
    margin-left:1rem;
    color:gray;
    font-size:0.8rem;
`
const SendBubbleBlock = styled.div`
    background:#1b8afe;
    display:inline-block;
    color:white;
    clear:both;
    font-size:1.2rem;
    padding:0.3rem 0.6rem 0.3rem 0.6rem;
    margin-right:1rem;
    border-radius:0.5rem;
    margin-top:0.5rem;
    max-width:15rem;
`
const ReceiveBubbleBlock = styled.div`
    display:inline-block;
    color:black;
    background:#e2e2e2;
    font-size:1.2rem;
    padding:0.3rem 0.6rem 0.3rem 0.6rem;
    border-radius:0.5rem;
    max-width:20rem;
    clear:both;
`
const NotiBubbleBlock = styled.div`
    margin:0 auto;
    text-align:center;
    color:white;
    background-color:rgba(0,0,0,0.5);
    font-size:1rem;
    padding:0.3rem 0.6rem 0.3rem 0.6rem;
    border-radius:0.5rem;
    width:auto;
    display:inline-block;
    clear:both;
    max-width:90vw;
`
const Sender = styled.div`
    margin-bottom:0.3rem;
`
const RightBubbleBlock  = styled.div`
    text-align:right;
    clear:both;
    margin-top:1rem;
    margin-left:1rem;
    font-size:0.8rem;
`

export function SendBubble(props){
  return (
   <RightBubbleBlock>
  <SendBubbleBlock>
  {props.text}
  </SendBubbleBlock>
 </RightBubbleBlock>
    )
};

export function ReceiveBubble(props){
  return (
      <BubbleBlock>
   <Sender>{props.sender}</Sender>
  <ReceiveBubbleBlock>
  {props.text}
  </ReceiveBubbleBlock>
  </BubbleBlock>
    )
};

export function NotiBubble(props){
  return (
   <div style={{textAlign:"center",marginTop:"0.5rem"}}>   
  <NotiBubbleBlock>
  {props.text}
  </NotiBubbleBlock>
  </div>
    )
};