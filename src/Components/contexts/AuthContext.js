import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {auth, provider} from '../../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
    }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    //Not setting user while creating them becuase of Firebase's own method to notify you when the user is set
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    //If you dont want to use Firebase, change this line to go to another database and everything will work fine
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function googleSignin() {
        auth.signInWithPopup(provider)
            .then(async () => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    
                    //Problem with history.push when logging in with google account first time, doesn't redirect. Redirects on the second time.
                    setCurrentUser(currentUser)
                    //Works with await console.log(), so probably a timing issue
                    await console.log(currentUser);
                    await history.push("/myMap")
                }) 
                .catch((error) => {
                    console.log(error.code, error.message)
            });
    }

    //Firebase method to set the user from here, "user" will either currentUser or null
    //Unsubscribe from the onAuthStateChange listener whenever it's done
    //Does verification to see if there is a user
    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    //Passing value with useContext into App.js and it's children
    const value = {
        currentUser,
        signup,
        login,
        logout,
        googleSignin,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
