import React from 'react'
import { Button } from '@material-ui/core';
import {db, batch} from '../../firebase'
import '../../App.css'
import useFirestore from '../contexts/useFirestore';

const SaveButton = ({markers, setSuccess}) => {
    const {docs} = useFirestore("markers")

    const openAlert = () => {
        setSuccess("Saved Successfully")
        setTimeout(() => {
            setSuccess("")
        }, 2000)
    }

    const saveHandler = () => {

        console.log(docs);
            db.collection("markers")    
            


            // for(let i=0; i<markers.length; i++){
            //     if(markers[i] !== docs){
            //     db.collection("markers").add(markers[i]);
            //     console.log(markers[i])
            //     } else {
            //         console.log("Already Saved")
            //     }
            // } 

            // markers.forEach((doc) => {
            //     let docRef = db.collection("markers").doc();
            //     batch.set(docRef, doc)
            // })
            // console.log("This batch is ready to go")
            
            // await batch
            // .commit()
            // .then(() => {
            //     console.log("done")
            // })
            // .catch(err => console.log(`There was an ${err}`))

            openAlert();
    };

    return (
        <div className="buttons" id="saveBtn">
            <Button variant="contained" color="primary" onClick={saveHandler}>Save</Button>
        </div>
    )
}

export default SaveButton
