import { useContext, useState } from 'react';
import firebase from '../../services/dbConnection';
import { AuthContext } from '../../contexts/userAuth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import './profile.css';

export default function Profile(){
    const { user, signOut, setUser, storageUser } = useContext(AuthContext);
    
    const[name, setName] = useState(JSON.parse(user).name);
    const[email, setEmail] = useState(JSON.parse(user) && JSON.parse(user).email);
    const[avatarUrl, setAvatarUrl] = useState(JSON.parse(user) && JSON.parse(user).avatarUrl);
    const[avatarImage, setAvatarImage] = useState(null);

    console.log(JSON.parse(user).name);

    async function handleEdition(e){
        e.preventDefault();
        
        if(avatarImage === null && name !== ''){

            await firebase.firestore().collection('users')
            .doc(JSON.parse(user).uid)
            .update({
                name: name
            }).then(() => {
                let data = {
                    ...user
                }
                setUser(data);
                storageUser(data);
            })

        }
        
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='My profile'>
                    <FiSettings size={24}/>
                </Title>
            
                <div className='container'>
                    <form className='form-profile' onSubmit={handleEdition}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>

                            <input type='file' accept='image/*' /> <br/>
                            { avatarUrl === null ? 
                                <img src={avatar} width='250' height='250' alt='Profile'/>
                                :
                                <img src={avatarUrl} width='250' height='250' alt=''/>
                            }
                        </label>
                        <br/>
                        <label>Name</label> <br/> {/* ONLY A  PALLIATIVE MEASURE*/}
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}/> <br/>
                        <label>Email</label> <br/>
                        <input type='text' value={JSON.parse(localStorage.getItem('SystemUser')).email} disabled={true}/>
                        <br/> 
                        <button type='submit'>Save</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => signOut()}>Log out</button>
                </div>

            </div>
        </div>
    );
}