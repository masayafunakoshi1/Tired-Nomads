import { useEffect, useState } from "react";
import { db } from "../../firebase";

//Passing through collection name throgh "collection" parameter
const useFirestore = (collection) => {
  //Images will go into empty useState array
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    db.collection(collection)
      //will take snapshot of database and take a new one when something is updated
      .onSnapshot((snap) => {
        //Array of documents will have both the data and id associated with each
        let documents = [];
        //Cycles through the documents within the database collection at the time, when we get Snapshot
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
  }, [collection]);

  return { docs };
};

export default useFirestore;
