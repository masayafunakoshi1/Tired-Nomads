import React from 'react'
import {useAuth} from './contexts/AuthContext'
import {useHistory as history} from 'react-router-dom'
import '../App.css';
import {Button} from '@material-ui/core';

const Logout = ({setError, changes}) => {
    const {logout} = useAuth();

    //Logout and go back to homepage
    const handleLogout = async() => {
        setError('')
        try{
            //Checks for unsaved changes, if true then reconfirm if you want to log out
            if(changes){
                console.log("Unsaved Changes")
                if(window.confirm("Unsaved Changes. Are you sure you want to logout?")){
                    logout()
                    await history.push('/')
                }else{
                    console.log("canceled")
                }
            } else {
                logout()
                await history.push('/')
            }
        } catch{
            setError("Failed to log out")
        }
    }                
    

    return (
        <div className="buttons">
            <Button variant="contained" color="secondary" onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default Logout
