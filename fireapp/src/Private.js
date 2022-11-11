import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

export default function Private({children}){
    const[loading, setLoading] = useState(true);
    const[signed, setSigned] = useState(false);

    useEffect(() => {

        async function checkLogin(){
            const unsub = await onAuthStateChanged(auth, (user) => {
                //IF THERE IS AN USER LOGGED
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@userDetail", JSON.stringify(userData));
                    setLoading(false);
                    setSigned(true);
                } else {
                    setLoading(false);
                    setSigned(false); 
                }
                
            })
        }

        checkLogin();
    }, [])

    if(loading){
        return(
            <div></div>
        );
    }

    if(!signed){
        return <Navigate to='/'/>
    }

    return children;
}