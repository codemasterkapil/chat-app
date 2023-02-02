
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect,useState } from 'react';
import Pusher from 'pusher-js'
import axios from './axios';



function App() {

   const [messages,setMessages]=useState([]);

   useEffect(()=>{
      axios.get('/messages/sync').then((response)=>{
        setMessages(response.data);
      });
   },[])


  // runs a piece of code only once when the component is loaded
   useEffect(() => {
      const pusher = new Pusher('7335617ed0f2cc1af1c1', {
        cluster: 'ap2'
      });

      const channel = pusher.subscribe('messages');
      channel.bind('inserted', function(newMessage) {
        // alert(JSON.stringify(newMessage));
        setMessages([...messages,newMessage])
      });     

       return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
       };

      
   }, [messages]);

  
   

  return (
    <div className='app'>
      <div className="app__body">
          <Sidebar></Sidebar>
          <Chat messages={messages}></Chat>
      </div>
    </div>
  );
}

export default App;
