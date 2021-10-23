import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './pages/Main'
import Chat from './pages/Chat'
import { ChatProvider } from './ChatContext';

function App(){
  return (
      <>
       <ChatProvider children = {Chat}>
  <Router>
    <Route exact path="/" component={Main}/> 
    <Route path="/chat" component={Chat} />
  </Router>
  </ChatProvider>
  </>
    )
};

export default App