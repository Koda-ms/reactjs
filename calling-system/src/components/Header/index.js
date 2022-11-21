import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/userAuth';
import { Link }  from 'react-router-dom';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import './header.css';

function Header(){
    const { user } = useContext(AuthContext);
    
    const[avatarUrl, setAvatarUrl] = useState(JSON.parse(user) && JSON.parse(user).avatarUrl);
    
    return(
        <div className='sidebar'>
            <div>
                <img src={avatarUrl === null ? avatar : avatarUrl } alt='Foto de perfil'/>
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