import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/userAuth';
import firebase from '../../services/dbConnection';
import { toast } from 'react-toastify';
import './signin.css';

function SignIn(){
    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const { storageUser, setUser } = useContext(AuthContext);

    //const[user, setUser] = useState(null);
    const[loadingAuth, setLoadingAuth] = useState(false);
    
    function handleLogIn(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email, password);
        } else{
            alert("Complete the gaps, please");
        }
    }

    async function signIn(email, password){
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
           let uid = value.user.uid;

           const userProfile = await firebase.firestore().collection('users').doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            navigate('/home', { replace: true });
            toast.success("Welcome to the platform!");
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops! Something went wrong");
        })
    }

    return(
        <div className='login-container'>
            <div className='logo'>
                <div className='logo-area'>
                    <img src={require('../../assets/logo.png')} alt=''/>
                </div>
                <form onSubmit={handleLogIn} className='form'>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit'>{loadingAuth ? 'Loading...' : 'Sign In'}</button>
                </form>
                <Link to='/signup'>Don't have an account? Sign up here!</Link>
            </div>
        </div>
    );

}

export default SignIn;