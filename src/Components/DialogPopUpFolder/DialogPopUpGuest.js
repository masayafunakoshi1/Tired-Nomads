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
import FeedbackIcon from '@material-ui/icons/Feedback';

const DialogPopUpGuest = ({currentUser}) => {
    const [popup, setPopup] = useState(false)

    const handleClose = () => {
        setPopup(false)
    }

    //"Get Started" pop-up
    useEffect(() => {
        if(currentUser.uid === "JVNTvZBaZWYLLI0cidWbbNQC2vj2"){
        setPopup(true);
        }
    }, [])

    return (
        <>
            <Slide direction="up" timeout={500} in={popup}>
                <Dialog
                    open={popup}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Welcome Guest User!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Thanks for trying out my app!
                                <br/>
                                <div>
                                    This is the <strong>guest version</strong>, so note that anything you save or write can be accessed and changed by <strong>---ANYONE---</strong>
                                </div>
                                If you have any questions, comments, or bugs that you encounter, <br/> click on this button -- <FeedbackIcon color="primary" fontSize="small"/> -- in the app. <br/>I'd love to hear some feedback!

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            I Understand
                        </Button>
                    </DialogActions>
                </Dialog>
            </Slide>
     </>
    )
}

export default DialogPopUpGuest
