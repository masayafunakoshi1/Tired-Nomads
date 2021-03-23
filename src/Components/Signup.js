import React, {useState, useRef} from 'react'
import { 
    Container, 
    Button, 
    TextField,
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close';

import {useAuth} from './contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import "./styles/Login.css"

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        //If passwords dont match
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match")
        }
        //If they filled out the inputs correctly
        try{
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            //Send user somewhere after creating account
            history.push("/login")  
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <Container className="loginContainer" maxWidth="sm">

            <h2 className="loginTitle">Sign Up</h2>

            <div className="closeButton">
                <Link to="/">
                    <CloseIcon style={{ fontSize: 50 }} />
                </Link>
            </div>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField 
                    label="Email" 
                    margin="normal" 
                    type="email" 
                    inputRef={emailRef} 
                    required/> 
                </div> 
                <div>
                    <TextField 
                    label="Password"  
                    margin="normal" 
                    type="password" 
                    inputRef={passwordRef} 
                    required/>
                </div>
                <div>
                    <TextField 
                    label="Password Confirmation"  
                    margin="normal" 
                    type="password" 
                    inputRef={passwordConfirmRef} 
                    required/>
                </div>

                <div className="btnContainer">
                    <Button 
                    disabled = {loading}
                    variant="contained" 
                    color="primary"
                    type="submit" 
                    >Sign Up</Button>
                </div>
            </form>
            <div className="links">
                Already have an account?
                <Link to="/login">Log in</Link>
            </div>

        </Container>
    )
}

export default Signup
