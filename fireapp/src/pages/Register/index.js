import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register(){
    const[name, setName] = useState('')
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("User registered.");
                navigate('/', { replace: true });
            })

        } else {
            alert("Fill all the gaps, please");
        }
    }

    return(
        <div className="home-container">
            <h1>Sign Up</h1>
            <span>Let's create your account.</span>
            
            <form className="form" onSubmit={handleRegister}>
                <input type='text' 
                    placeholder='Name' 
                    value={name} onChange={(e) => setName(e.target.value)}/>
                <input type='text' 
                    placeholder='Email' 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' 
                    placeholder='Password' 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type='submit'>Sign up</button>
            </form>
            <span className="signup">
                Already have an account?
                <Link to='/register'>Login!</Link>
            </span>
            
        </div>
    )

}

export default Register;