import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import './Chat.css'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';
import axios from './axios';


const Chat = ({messages}) => {

  const [input,setInput]=useState('');

  const sendMessage=async(e)=>{
    e.preventDefault();

    await axios.post('/messages/new',{
         message:input,
         name:"kapil",
         timestamp:new Date().toString(),
         received:false,
    });

    setInput('');

  }
  
  

  return (
    <div className='chat'>
       <div className="chat__header">
          <Avatar></Avatar>
          <div className="chat__headerInfo">
              <h3>Room name...</h3>
              <p>Last Seen AT...</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
               <SearchIcon></SearchIcon>
            </IconButton>
            <IconButton>
                <AttachFileIcon></AttachFileIcon>
            </IconButton>
            <IconButton>
                 <MoreVert></MoreVert>
            </IconButton>
          </div>
       </div>
 
       <div className="chat__body">
        {
           messages.map(({name,message,timestamp,received})=>{
                return(
                     <p  key={timestamp} className={`chat__message ${received && "chat__receiver"}`}>
                    <span className="chat__name">
                    {name}
                    </span>
                    {message}
                    <span className="chat__timestamp">
                      {timestamp}
                    </span>
                    </p>        
                    )
                    
           })
        }
       </div>
       
       <div className="chat__footer">
          <InsertEmoticonIcon></InsertEmoticonIcon>
          <form >
            <input value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Type a message" type="text" />
            <button onClick={sendMessage} type="submit">Send a message</button>
          </form>
          <MicIcon></MicIcon>
       </div>
    </div>
  )
}

export default Chat