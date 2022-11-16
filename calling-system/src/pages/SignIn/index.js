import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/userAuth';
import './signin.css';

function SignIn(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);
    
    function handleLogIn(e){
        e.preventDefault();
        if(email !== '' && password !== ''){
            signIn(email, password);
        } else{
            alert("Complete the gaps, please")
        }
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