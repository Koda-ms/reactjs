import { useContext } from 'react';
import { AuthContext } from '../../contexts/userAuth';
import { Link }  from 'react-router-dom';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import './header.css';

function Header(){
    //TODO: CHECK THE CONTEXT. THE USER CONST IS RETURNING undefined WHEN ITS PROPS IS SETTLED
    const { user } = useContext(AuthContext);
    console.log(user)
    console.log(JSON.parse(user))
    
    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt='Foto de perfil'/>
            </div>

            <Link>
                <FiHome color='#fff' size={24}/>
                Calls
            </Link>
            <Link>
                <FiUsers color='#fff' size={24}/>
                Clients
            </Link>
            <Link>
                <FiSettings color='#fff' size={24}/>
                Settings
            </Link>
        </div>
    );

}

export default Header;