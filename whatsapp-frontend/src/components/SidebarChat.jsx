import { Avatar } from '@material-ui/core'
import React, {useState} from 'react'
import '../styles/SidebarChat.css'
import { Link } from 'react-router-dom'
const SidebarChat = () => {
    const createChat = () => {
        alert('Only admin can add new chats!!')
    }
    return(
        <>
        <div className="sideBARCHAT">
            <div onClick={createChat} className="SidebarChat">
                <h2>Add new Chat</h2>
            </div>
            <Link to={`/rooms/`}>
            <div className="SidebarChat">
                <Avatar src='https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'/>
                <div className="sidebarChat_info">
                <h2>Live Chat Room</h2>
                <p>Aman : Hii</p>
                </div>
            </div>
            </Link>
            </div>
        </>
        )
}

export default SidebarChat;