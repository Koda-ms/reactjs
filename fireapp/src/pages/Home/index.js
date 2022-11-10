import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import './home.css';

function Home(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/admin', { replace: true });
            })
            .catch((error) => {
                alert("Error occured: " + error);
            })

        } else {
            alert("Fill all the gaps, please");
        }
    }

    return(
        <div className="home-container">
            <h1>Tasks List</h1>
            <span>Manage your schedule on an easy way.</span>
            
            <form className="form" onSubmit={handleLogin}>
                <input type='text' 
                    placeholder='Email' 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' 
                    placeholder='Password' 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
            </form>
            <span className="signup">
                Don't have an account? 
                <Link to='/register'>Sign Up</Link>
            </span>
            
        </div>
    )

}

export default Home;