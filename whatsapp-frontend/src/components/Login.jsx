import React from 'react'
import '../styles/Login.css'
import { Button } from '@material-ui/core'
import {auth, provider} from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

const Login = () => {

    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => console.log(error));
    }
    return(
        <>
        <div className="login">
        <div className="login_container">
            <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png" alt="WhatsApp"/>
        <div className="login_text">
            <h1>Sing in to WhatsApp</h1>
        </div>
        <Button type='submit' onClick={signIn}>
            Sign In With &nbsp;
            <spna className="goole__btn">
                <span className="span4">G</span>
                <span className="span2">oo</span>
                <span className="span3">g</span>
                <span className="span4">le</span>
            </spna>
        </Button>
        </div>
        </div>
        </>
    );
}

export default Login;