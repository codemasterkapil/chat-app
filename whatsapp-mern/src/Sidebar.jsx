import React from 'react'
import './Sidebar.css'

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';


function Sidebar() {
  return (
    <div className='sidebar'>
       <div className="sidebar__header">
           <Avatar alt="Cindy Baker" src="https://media.licdn.com/dms/image/C4D03AQE7YkHN3a2E_w/profile-displayphoto-shrink_400_400/0/1657960057265?e=1680134400&v=beta&t=5C_nN9or9J0N_pby4ZPGgja7oz85jjaEfhw0zvgB264" />
           <div className="sidebar__headerRight">
            <IconButton  >
                <DonutLargeIcon />
            </IconButton>
            <IconButton  >
                <ChatIcon /> 
            </IconButton>
            <IconButton  >
                <MoreVertIcon />
            </IconButton>
              
           </div>
       </div>
       <div className="sidebar__search">

          <div className="sidebar__searchContainer">
             <SearchIcon />
             <input placeholder="search or start the new chat"  type="text" />
          </div>
       </div>

       <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
       </div>

    </div>
  )
}

export default Sidebar