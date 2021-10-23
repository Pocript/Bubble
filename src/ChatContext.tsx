import React, { useReducer,createContext,useContext,useRef } from 'react';

const initialChats = [];

function chatReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.chat);
    case 'REMOVE':
      return state.filter(chat => chat.id !== action.id);
    case 'CLEAR':
      return state = []
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ChatStateContext = createContext();
const ChatDispatchContext = createContext();
const ChatNextIdContext = createContext();

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialChats);
  const nextId = useRef(1);
  
  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        <ChatNextIdContext.Provider value={nextId}>
          {children}
        </ChatNextIdContext.Provider>
      </ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  );
}

export function useChatState() {
  const context = useContext(ChatStateContext);
  if (!context) {
    throw new Error('Cannot find ChatProvider');
  }
  return context;
}

export function useChatDispatch() {
  const context = useContext(ChatDispatchContext);
  if (!context) {
    throw new Error('Cannot find ChatProvider');
  }
  return context;
}

export function useChatNextId() {
  const context = useContext(ChatNextIdContext);
  if (!context) {
    throw new Error('Cannot find ChatProvider');
  }
  return context;
}