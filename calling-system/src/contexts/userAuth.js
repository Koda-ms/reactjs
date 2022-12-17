import { useState, createContext, useEffect } from 'react';
import firebase from '../services/dbConnection';
import { toast } from 'react-toastify';
//import { Navigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const[user, setUser] = useState(null);
    const[loadingAuth, setLoadingAuth] = useState(false);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        //THIS FUNCTION CHECKS IF THERE'S ANYTHING ON THE SYSTEM'S STORAGE,
        //SO IT COULD LOAD ON THE SCREEN
        function loadStorage(){
            const storageUser = localStorage.getItem('SystemUser');
          
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    }, []);

    //LOGIN USER FUNCTION
    // async function signIn(email, password){
    //     setLoadingAuth(true);
    //     await firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(async (value) => {
    //        let uid = value.user.uid;

    //        const userProfile = await firebase.firestore().collection('users').doc(uid).get();
            
    //         let data = {
    //             uid: uid,
    //             name: userProfile.data().name,
    //             avatarUrl: userProfile.data().avatarUrl,
    //             email: value.user.email
    //         };
    //         setUser(data);
    //         storageUser(data);
    //         setLoadingAuth(false);
    //         toast.success("Welcome to the platform!");
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setLoadingAuth(false);
    //         toast.error("Ops! Something went wrong");
    //     })
    // }

    //REGISTER USER FUNCTION
    async function signUp(name, email, password){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.firestore().collection("users").doc(uid).set({
                name: name,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                //storageUser(data);
                setLoadingAuth(false);
                toast.success("Account created successfully!");
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }
    
    function storageUser(data){
        localStorage.setItem('SystemUser', JSON.stringify(data));
    }

    //LOGOUT FUNCTION
    // async function signOut(){
    //     await firebase.auth().signOut();
    //     localStorage.removeItem('SystemUser');
    //     setUser(null);
    // }
    
    return(
        //TO WORK FINE, THE value 'signed' MUST BE PASSED AS A BOOLEAN, HOWEVER
        //THE const user IS AN OBJECT. SO, TO CONVERT IT, WE USE THE !! SIGN, THAT
        //RETURN true F THERE'S SOMETHING ON THE OBJECT, OR false IF THERE'S NOTHING
        <AuthContext.Provider value={{ signed: !!user, 
            user, 
            loading, 
            signUp, 
            loadingAuth,
            setUser,
            storageUser }}>
            {children}
        </AuthContext.Provider>
    );
    
}

export default AuthProvider;