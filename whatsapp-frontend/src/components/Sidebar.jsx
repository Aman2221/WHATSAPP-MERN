import React , { useState, useEffect } from 'react'
import { Avatar , IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from '../components/SidebarChat'
import { useStateValue } from '../StateProvider';
import '../styles/Sidebar.css'
const Sidebar = () => {
    
    const [{user}] = useStateValue();
    return(
        <>
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://www.transparentpng.com/thumb/whatsapp/GrwKkd-wp-logo-whatsapp-cut-out-png.png" />
                <div className="sidebar_headerRight">
                <IconButton><DonutLargeIcon /></IconButton>
                <IconButton><ChatIcon /></IconButton>
                <IconButton><MoreVertIcon /></IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="search_container">
                    <SearchIcon/>
                    <input type="text" placeholder='Search or start new chat'/>
                </div>
            </div>
        <div className="sidebarchat">
            <div className="sidebar_chats">
                <SidebarChat addNewChat/> 
            </div>
        </div>
        </div>
        </>
    );
}

export default Sidebar;