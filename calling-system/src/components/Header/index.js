import { useContext } from 'react';
import { AuthContext } from '../../contexts/userAuth';
import { Link }  from 'react-router-dom';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import './header.css';

function Header(){
    const { user } = useContext(AuthContext);
    
    return(
        <div className='sidebar'>
            <div>
                <img src={JSON.parse(user).avatarUrl === null ? avatar : JSON.parse(user).avatarUrl } alt='Foto de perfil'/>
            </div>

            <Link to='/home'>
                <FiHome color='#fff' size={24}/>
                Calls
            </Link>
            <Link to='/customers'>
                <FiUsers color='#fff' size={24}/>
                Customers
            </Link>
            <Link to='/settings'>
                <FiSettings color='#fff' size={24}/>
                Settings
            </Link>
        </div>
    );

}

export default Header;