import React from 'react'
import { Button } from '@material-ui/core';
import {db} from '../../firebase'
import '../../App.css'

const SaveButton = ({markers, setSuccess}) => {

    const openAlert = () => {
        setSuccess("Saved Successfully")
        setTimeout(() => {
            setSuccess("")
        }, 2000)
    }

    const saveHandler = () => {
        let batch = db.batch();
        //sets batch as new mark ers, then commits them to firestore
        if(markers !== [] || null || undefined){
            markers.forEach((doc) => {
                let markersList = db.collection('users')
                                .doc('user1')
                                .collection('markers')
                                .doc(`${doc.key}`);
                batch.set(markersList, doc);
            })
            batch.commit()
            .then(openAlert())
        } else{
            console.log("nothing to commit")
        }
        
        
    };

    return (
        <div className="buttons" id="saveBtn">
            <Button variant="contained" color="primary" onClick={saveHandler}>Save</Button>
        </div>
    )
}

export default SaveButton
