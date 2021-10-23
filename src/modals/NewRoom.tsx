import React,{useState} from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Header from '../components/Header'
import {Socket} from '../util'
const socket = new Socket()

const ModalBlock = styled.div`
    background-color:white;
    width:100vw;
    height:100vh;
    position:fixed;
`
const Close = styled.div`
    font-size:2rem;
    float:right;
    margin-right:1rem;
    font-size:3.5rem;
`
const Input = styled.input`
    width:80vw;
    height:2rem;
    margin:0 auto;
    display:block;
    margin-bottom:1rem;
    font-size:1.5rem;
    border:0.1rem solid #d2d2d2;
    border-radius:0.5rem;
    &:focus{
        outline:none;
    }
`
const Button = styled.button`
    width:80vw;
    height:2.5rem;
    margin:0 auto;
    display:block;
    margin-bottom:1rem;
    font-size:1.5rem;
    background-color:#1b8afe;
    border:none;
    color:white;
    border-radius:1rem;
`

function Modal(props){
  
  const [name,setName] = useState("")
  const [desc,setDesc] = useState("")
  
  const handleModal = () =>{
      props.setModalOpen(false)
  }
  const handleSetRoom = () =>{
      let _id =  +new Date()
      socket.setRoom({_id:_id,name:name,desc:desc})
  }
  const handleNameChange = (e) =>{
      setName(e.target.value)
  }
  const handleDescChange = (e) =>{
      setDesc(e.target.value)
  }
  return (
      <>
  {props.isOpen ? (
  <ModalBlock>
  <Header title="방 생성">
  <Close onClick={handleModal}>×</Close>
  </Header>
  <Input placeholder="방 제목을 입력해주세요."
         onChange={handleNameChange} 
         value={name}/>
  <Input placeholder="방 설명을 입력해주세요."
         onChange={handleDescChange} 
         value={desc}/>
  <Button onClick={handleSetRoom}>생성</Button>
  </ModalBlock>
  ):<div></div>}
  </>
    )
};

export default Modal