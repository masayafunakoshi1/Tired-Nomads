import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import {Button,
        TextField,
        Paper,
        FormControl,
        InputLabel,
        Select} from '@material-ui/core'
import FeedbackIcon from '@material-ui/icons/Feedback';
import {db} from '../../firebase'

const useStyles = makeStyles(() => ({
    paperStyle: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '250px',
        height: '200px',
        zIndex: 20,
    },
    formItems: {
        marginTop: '15px',
        marginBottom: '15px',
    },
    dropDown: {
        width: '130px'
    },
}));

const Feedback = ({setAnchorEl, currentUser, setSuccess, setError}) => {
    const classes = useStyles();
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackTopic, setFeedbackTopic] = useState('')
    const [feedbackValue, setFeedbackValue] = useState('')
    const userFeedback = db.collection('users').doc(currentUser ? currentUser.uid : null).collection('feedback')

    const submitHandler = (e) => {
        e.preventDefault()
        FBHandler()
    }

    const openSuccessAlert = () => {
        setSuccess("Feedback sent successfully")
        setTimeout(() => {
            setSuccess("")
        }, 1500)
    }

    const openFailureAlert = () => {
        setError("Failed to send")
        setTimeout(() => {
            setError("")
        }, 1500)

    }

    const FBHandler = () => { 
        if(userFeedback){
            userFeedback.doc(generateKey(feedbackTopic)).set({
                feedbackValue
            }).then(() => {
                console.log("Feedback Sent")
                setFeedbackTopic('')
                setFeedbackValue('')
            }).then(() => {
                openSuccessAlert()
            }).catch((err) => {
                console.log(err)
                openFailureAlert()
            })
        }

    }

    const generateKey = (data) => { //Generate random key for feedback in Firebase
        return `${data}_${new Date().getTime() }`;
    } 

    const showFeedbackHandler = () => {
        if(!showFeedback){setShowFeedback(true)}
        else{ setShowFeedback(false) }
    }

    return (
        <div className="feedback">
                <button
                    onClick={showFeedbackHandler}
                    onMouseEnter={e => setAnchorEl(e.target)}
                    onMouseLeave={() => setAnchorEl(null)}
                    className="feedbackBtn"
                >
                    <FeedbackIcon 
                    color="primary" 
                    fontSize="large" 
                    cursor="pointer"
                    />
                </button>

            { showFeedback &&
            <Paper
                elevation={4} 
                variant="elevation"
                className={classes.paperStyle}
                >
                <form onSubmit={e => submitHandler(e)}>
                    <div className={classes.formItems}>
                        <FormControl  className={classes.dropDown}>
                            <InputLabel>Topic</InputLabel>
                            <Select 
                                native
                                value={feedbackTopic}
                                onChange={e => setFeedbackTopic(e.target.value)}
                            >
                                <option value={''}></option>
                                <option value={'Bug-Report'}>Bug Report</option>
                                <option value={'Suggestion'}>Suggestion</option>
                                <option value={'Questions-Concerns'}>Question/Concern</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.formItems}>
                        <TextField 
                        className={classes.multilineTextfield}
                        label="Multiline"
                        multiline
                        rowsMax={5}
                        value={feedbackValue}
                        onChange={e => setFeedbackValue(e.target.value)}
                        variant="outlined"
                        />
                    </div>
                    <div className={classes.formItems}>
                        <Button 
                        variant="contained" 
                        color="primary"
                        type="submit"
                        disabled={ !feedbackTopic || !feedbackValue || feedbackValue === "" }
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
            }

        </div>
    )
}

export default Feedback
