import  {useState, useEffect} from 'react'
import { Avatar , IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import React from 'react'
import '../styles/Chat.css'
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios'
import { useStateValue } from '../StateProvider';

const Chat = ( {messages} ) => {

    const [{user}] = useStateValue();
    const [input,setInput] = useState('');
    const sendMessage = (e) => {
        e.preventDefault();
        setInput(e.target.value)
        
        axios.post('/messages/new', {
            "message" : input,
            "name" : "Test", //firebase user login user name 
            "timestamp" : "Just now",
            "received" : false
        });
        setInput('');
    };
    return(
        <>
        <div className="chat">

        <div className="chat_header">
            <Avatar src={user?.photoURL}/>
            <div className="chat_headerInfo">
                <h3>{user.displayName}</h3>
                <p>{user.metadata.lastSignInTime}</p>
            </div>
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
            <div className="chat_body">
            {messages.map((message) => (
                <p className={`chat_message ${message.received && "chat_reciver"}`}>
                    <spna className="chat_name">{message.name}</spna>
                        {message.message}
                    <span className="chat_timeStamp">
                    {message.timestamp}
                    </span>
                </p> 
            ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form action="">
                    <input 
                    type="text" 
                    placeholder='Type a meassage' 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    />
                    <button type='submit' onClick={sendMessage}>Send</button>
                </form>
                <MicIcon/>
            </div>
        </div>
        </>
    );
}

export default Chat;