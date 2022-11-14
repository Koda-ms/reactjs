import { useState, createContext, useEffect } from 'react';
import firebase from '../services/dbConnection';

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
                setUser(storageUser);
                setLoading(false);
            }
            setLoading(false);
        }

        loadStorage();
    }, []);

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
                storageUser(data);
                setLoadingAuth(false);
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

    return(
        //TO WORK FINE, THE value 'signed' MUST BE PASSED AS A BOOLEAN, HOWEVER
        //THE const user IS AN OBJECT. SO, TO CONVERT IT, WE USE THE !! SIGN, THAT
        //RETURN true F THERE'S SOMETHING ON THE OBJECT, OR false IF THERE'S NOTHING
        <AuthContext.Provider value={{ signed: !!user, user, loading, signUp }}>
            {children}
        </AuthContext.Provider>
    );
    
}

export default AuthProvider;