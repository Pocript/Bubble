import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import Header from '../components/Header'
import {Util} from '../util'
import NewRoomModal from '../modals/NewRoom'
import ChatModal from '../modals/Chat'
import styled from 'styled-components';
import {Socket} from '../util'
const socket = new Socket()

const util = new Util()
const RoomBlock = styled.div`
    width:100%;
    border-bottom:0.1rem solid #e2e2e2;
`
const NewRoom = styled.div`
    font-size:2rem;
    float:right;
    margin-right:1rem;
    font-size:3.5rem;
`
const Desc = styled.div`
    font-size:1.2rem;
    margin-left:1rem;
    padding-bottom:1.3rem;
`
const Title = styled.div`
    font-size:1.3rem;
    margin-bottom:0.5rem;
    font-weight:600;
    margin-left:1rem;
    padding-top:1.3rem;
`
function Main(){
  let [isOpen,setModalOpen] = useState(false)
  let [chatOpen,setChatOpen] = useState(false)
  let [room,setRoom] = useState([])
  let [joinRoom,setJoinRoom] = useState(false)
  const handleModal = () =>{
      setModalOpen(true)
  }
  const handleChatModal = (_id,name) =>{
      setChatOpen(true)
      socket.joinRoom(_id)
      setJoinRoom({_id:_id,name:name})
      window.localStorage.setItem('joinRoom', _id);
  }
  useEffect(() => {
    socket.emit('get_roomlist',{})
    
  }, [])
  
  socket.getData('get_roomlist',function(data){
      setRoom(data)
  })
    
  return (
  <div>
  <NewRoomModal isOpen={isOpen} setModalOpen={setModalOpen}/>
  <ChatModal isOpen={chatOpen} 
             setModalOpen={setChatOpen} 
             myroom={joinRoom}/>
  <Header title="전체방">
  <NewRoom onClick={handleModal}>+</NewRoom>
  </Header>
  {room.map((e,i)=>
      <RoomBlock key={e._id} onClick={()=>{handleChatModal(e._id,e.name)}}>
      <Title>{e.name}</Title>
      <Desc>{e.desc}</Desc>
      </RoomBlock>
  )}
  </div>
    )
};

export default Main