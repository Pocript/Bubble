import React,{useState,useRef,useEffect} from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Header from '../components/Header'
import {SendBubble,ReceiveBubble,NotiBubble} from '../components/Bubble'
import {Socket,ChatLog } from '../util'
import { useChatState,useChatDispatch,useChatNextId } from '../ChatContext'

const socket = new Socket()
const Chatlog = new ChatLog()

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
const InputBlock = styled.div`
    width:100vw;
    height:2.5rem;
    background:#e2e2e2;
    position:fixed;
    bottom:0rem;
    border-top:0.3rem solid #e2e2e2;
    border-bottom:0.3rem solid #e2e2e2;
`
const Input = styled.input`
    width:calc(100vw - 4rem);
    margin:0;
    padding:0;
    border:none;
    font-size:1.2rem;
    float:left;
    height:100%;
    &:focus{
        outline:none;
    }
`
const Send = styled.div`
    width:3.7rem;
    height:3.5rem;
    float:right;
    background:white;
`
const ChatLogBlock = styled.div`
    width:100vw;
    height:calc(100vh - 15rem);
    background:#fff;
    overflow:scroll;
`
function ChatModal(props){
  const chats = useChatState();
  const dispatch = useChatDispatch();
  const nextId = useChatNextId();
  
  const handleModal = () =>{
      props.setModalOpen(false)
      //socket.leaveRoom(props.myroom._id)
  }
  let [prevChat,setPrevChat] = useState([])
  let [msg,setMsg] = useState("")
  const handleInput = (e) => {
      setMsg(e.target.value)
  }
  const handleSend = () =>{
      console.log(chats)
      if(msg==="") return;
      dispatch({
      type: 'CREATE',
      chat: {
        id: nextId.current,
        value: <SendBubble text={msg}/>,
      }
    });
      nextId.current += 1;
      socket.emit('message',{msg:msg,room:props.myroom._id})
      Chatlog.add(props.myroom._id,1,msg)
      setMsg("")
      if(props.isOpen)
      scrollToBottom();
  }
  const handleKeyPress = (e) =>{
      if (e.key === "Enter") {
          handleSend()
    }
  }
 const scrollRef = useRef(null);
  const scrollToBottom =()=>{
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }
  
  useEffect(() => {
    socket.getData("message",async function(data){
    let thisRoom = window.localStorage.getItem('joinRoom')
    if(thisRoom==data.room){
      dispatch({
      type: 'CREATE',
      chat: {
        id: nextId.current,
        value:<ReceiveBubble text={data.msg}/>
      }
    });
      nextId.current += 1;
    }
      Chatlog.add(data.room,2,data.msg)
      scrollToBottom()
    })
    
  socket.getData("noti_message",async function(data){
      let thisRoom = window.localStorage.getItem('joinRoom')
      if(thisRoom == data.room){
      dispatch({
      type: 'CREATE',
      chat: {
        id: nextId.current,
        value: <NotiBubble text={data.msg}/>
      }
    });
    nextId.current += 1;
    scrollToBottom()
     }
  })
  
  }, [])
  
  useEffect(async () => {
      dispatch({type:"CLEAR"})
      let log = await Chatlog.getLog(props.myroom._id)
      setPrevChat(log)
      scrollToBottom()
  }, [props.myroom._id])
  
  
  
  return (
      <>
  {props.isOpen ? (
  <ModalBlock>
  <Header title={props.myroom.name}>
  <Close onClick={handleModal}>×</Close>
  </Header>
  <ChatLogBlock>
   {prevChat.map(e=>
   <div>
   {e.type===1?<SendBubble text={e.text}/>
    :<ReceiveBubble text={e.text}/>
   }
   </div>
   )}
   {chats.map(e=>e.value)}
     <div style={{float:"right",width:"100vw",background:"white",height:"4.5rem"
     }} ref={scrollRef}></div>
  </ChatLogBlock>
  <InputBlock>
  <Input onChange={handleInput} 
         value={msg} 
         onKeyPress={handleKeyPress}/>
  <Send onClick={handleSend}/>
  </InputBlock>
  </ModalBlock>
  ):<div></div>}
  </>
    )
};

export default ChatModal