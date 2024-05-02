import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import {createContext, useEffect, useState} from 'react';
import auth from '../firebase/firebase.config';
import PrivateRoute from '../routes/PrivateRoutes';

const googleProvider = new GoogleAuthProvider();
export const AuthContext= createContext('null')

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true)
    

    const createUser= (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);

    }

    const signIn= (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut=()=>{
        setLoading(true)
        sessionStorage.removeItem('LogIn');
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
            
        });
        return ()=>{
            unSubscribe();
        }
    },[])

    const AuthInfo={user, loading, signInWithGoogle, setLoading, createUser, logOut, signIn}
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

PrivateRoute.propTypes = {
    children: PropTypes.node
}