import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.config";
import PropTypes from 'prop-types'; 

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password)=>{
      return  signInWithEmailAndPassword(auth , email, password)
    }

const logout = () =>{
return signOut(auth)
}

    useEffect( ()=>{
     const unsubscribe =  onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
       })
return ()=>{
return unsubscribe()
}

    },[])
// -------------------------------------
    const authInfo = {
        user,
        createUser,
        signInUser,
        logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children} 
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node 
};

export default AuthProvider;
