import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/userAuth';

function SignUp(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const { signUp } = useContext(AuthContext);

    function handleSignUp(e){
        e.preventDefault();
        if(name !== '' && email !== '' && password !== ''){
            signUp(name, email, password);
        }
        setName('');
        setEmail('');
        setPassword('');
    }

    return(
        <div className='login-container'>
            <div className='logo'>
                <div className='logo-area'>
                    <img src={require('../../assets/logo.png')} alt=''/>
                </div>
                <form onSubmit={handleSignUp} className='form'>
                    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit'>Sign Up</button>
                </form>
                <Link to='/'>Already have an account? Sign in here!</Link>
            </div>
        </div>
    );

}

export default SignUp;