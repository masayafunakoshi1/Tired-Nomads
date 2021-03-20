import React, {useState, useRef} from 'react'
import { 
    Container, 
    Button, 
    TextField,
} from '@material-ui/core';
import {
    Alert
} from '@material-ui/lab'
import {useAuth} from './contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import "./styles/Login.css"

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const  handleSubmit = async (e) => {
        e.preventDefault();
        //If they filled out the inputs correctly
        try{
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)  
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    return (
        <Container className="loginContainer" maxWidth="sm">
            <h2 className="loginTitle">Log in</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <div>
                <TextField 
                label="Email" 
                margin="normal" 
                type="email" 
                ref={emailRef} 
                required/> 
            </div> 
            <div>
                <TextField 
                label="Password"  
                margin="normal" 
                type="password" 
                ref={passwordRef} 
                required/>
            </div>
            <div className="btnContainer">
                <Button 
                disabled = {loading}
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}>Log In</Button>
            </div>

            <div className="links">
                <Link to="/forgot-password">Forgot Password</Link>
            </div>

            <div className="links">
                Need an account? 
                <Link to="/signup"><br/>Sign Up</Link>
            </div>

        </Container>
    )
}

export default Login
