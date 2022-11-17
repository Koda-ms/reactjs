import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/userAuth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import './profile.css';

export default function Profile(){
    const { user } = useContext(AuthContext);
    const[name, setName] = useState(user && user.name);
    const[email, setEmail] = useState(user && user.email);
    const[avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='My profile'>
                    <FiSettings size={24}/>
                </Title>
            </div>

            <div className='profile-container'>
                <form className='form-profile'>
                    <label>
                        <span>
                            <FiUpload color='#fff' size={25}/>
                        </span>

                        <input type='file' accept='image/*'/> 
                        { JSON.parse(user).avatarUrl === null ? 
                            <img src={avatar} width='250' height='250' alt='Profile picture'/>
                            :
                            <img src={avatarUrl} width='250' height='250' alt=''/>
                        }
                    </label>

                    <label>Name</label> 
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                </form>
            </div>
        </div>
    );
}