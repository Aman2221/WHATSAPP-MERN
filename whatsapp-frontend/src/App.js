import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import './App.css';
import './styles/Login.css'
import { BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Pusher from 'pusher-js'
import axios from './axios'
import { auth, provider} from './firebase'
import { useStateValue } from './StateProvider'
import Login from './components/Login'
function App() {

  const [messages,setMessages] = useState([]);
  useEffect(() => {
       axios.get('/messages/sync')
       .then(responce => {
         setMessages(responce.data);
       })  
  }, [])

  useEffect(() => {
    let pusher = new Pusher('6729decb25fa19b8f6ad', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])

  const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            alert('user signed in successfully')
        })
        .catch((error) => console.log(error));
    }

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
    {!user ? (
      <Login />
    ) : (
      <div className="app_body">
      <Router>
        <Switch>
          <Route path='/rooms/:roomId'>
            <Sidebar/>
            <Chat/>
          </Route>
          <Route path="/">
            <Sidebar/> 
            <Chat messages={messages}/>
          </Route>
        </Switch>
      </Router>
      </div>
      )
    }
    </div>
  );
}

export default App;
