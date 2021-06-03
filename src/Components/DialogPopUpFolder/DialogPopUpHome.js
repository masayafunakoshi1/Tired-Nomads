import React, {useState, useEffect} from 'react'
import { 
    Dialog, 
    Slide,
    Button, 
    DialogContent, 
    DialogActions,  
    DialogContentText, 
    DialogTitle, 
 } from '@material-ui/core';
import { Link } from 'react-router-dom'

const DialogPopUpHome = () => {
    const [popup, setPopup] = useState(false)

    const handleClose = () => {
        setPopup(false)
    }

    //"Get Started" pop-up
    useEffect(() => {
        setPopup(true);
    }, [])

    return (

        <div>
            <Slide direction="up" timeout={500} in={popup}>
                <Dialog
                    open={popup}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    >
                <DialogTitle id="alert-dialog-slide-title">{"Welcome Nomad!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Fresh off of a road-trip or thinking about starting one? 
                        <br/>
                        <Link to="/signup">Create an account</Link> to start marking down your sleep-venture!
                        <br/>
                        Or try our <Link to="/login">Guest Account</Link>.
                        <strong>Click on the map to get started!</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Lets Sleep!
                </Button>
            </DialogActions>


                </Dialog>
            </Slide>
        </div>

    )
}

export default DialogPopUpHome
