import { useContext, useState } from 'react';
import firebase from '../../services/dbConnection';
import { AuthContext } from '../../contexts/userAuth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import './profile.css';
import { useNavigate } from 'react-router-dom';

export default function Profile(){
    const { storageUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const[user, setUser] = useState(JSON.parse(localStorage.getItem('SystemUser')));
    const[name, setName] = useState(user && user.name);
    //const[email, setEmail] = useState(user && user.email);
    const[avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const[avatarImage, setAvatarImage] = useState(null);


    async function handleEdition(e){
        e.preventDefault();
        
        if(avatarImage === null && name !== ''){
            
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name: name
            }).then(() => {
                console.log(name);
                let data = {
                    ...user,
                    name: name //THIS LINE ALLOWED THE LOCALSTORAGE TO UPDATE THE EDITED ATTRIBUTE
                }
                setUser(data);
                storageUser(data);
            })
        } else if (name !== '' && avatarImage !== null) {
            handleUpload();
        }
    }

    //TO-DO: THE AVATAR IT'S NOT BEING UPDATED WHEN THE LOG IN IS EFFECTED
    //FUNCTION THAT UPLOADS THE IMAGE IF HE HAS CHANGED AND SETS IT IN THE DATA BANK
    async function handleUpload(){
        const userId = user.uid;

        //REQUEST THAT SETS THE IMAGE IN THE STORAGE CREATING A PAST SEPARATED FOR EACH USER
        const updateTask = await firebase.storage().ref(`images/${userId}/${avatarImage.name}`)
        .put(avatarImage)
        .then(async () => {
            console.log("Photo updated successfully");

            //REQUEST TO TAKE THE PIC'S URL
            await firebase.storage().ref(`images/${userId}`).child(avatarImage.name).getDownloadURL()
            .then(async (url) => {
                let urlPhoto = url;

                //REQUEST TO SET THE URL TAKEN INTO THE avatarUrl THAT WILL DISPLAY ON THE HEADER
                await firebase.firestore().collection("users").doc(user.uid)
                .update({
                    avatarUrl: urlPhoto,
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: urlPhoto,
                        name: name
                    };
                    setUser(data);
                    storageUser(data);
                })
            })
        })
    }

    //FUNCTION TO DEAL WITH THE FILE SENT, SPECIALLY TO SHOW A PREVIEW OF IT ON THE PAGE
    function handleFile(e){
        //THIS CODITION GOES TO THE PLACE THE IMAGE IS KEPT
        //IF THERE IS AN IMAGE THERE
        if(e.target.files[0]){
            const image = e.target.files[0];

            //IF THE IMAGE IS ONE OF THESE TYPES, IT IS ACCEPTED
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setAvatarImage(image);
                //THIS ALLOWS THE IMAGE TO BE SEEN AS A PREVIEW
                //THE URL GENERATED IS THE KEY TO THAT ACTION
                setAvatarUrl(URL.createObjectURL(e.target.files[0])); 
            } else {
                alert("Please, enter a JPEG or PNG image only");
                setAvatarImage(null); //IF NO IMAGE WAS ACCEPTED, THE SET REMAINS null
                return null; //SO THIS PART MAY STOP
            }
        }
    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SystemUser');
        setUser(null);
        navigate('/', {replace: true});
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

                            <input type='file' accept='image/*' onChange={handleFile} /> <br/>
                            {/* THIS IS PROBABLY BEING A TRICK */}
                            { avatarUrl === null ? 
                                <img src={avatar} width='250' height='250' alt='Profile'/>
                                :
                                <img src={avatarUrl} width='250' height='250' alt=''/>
                            }
                        </label>

                        <br/>
                        <label>Name</label> <br/>
                        
                        <input type='text' defaultValue={user ? user.name : ''} onChange={(e) => setName(e.target.value)}/> <br/>  
                        
                        <label>Email</label> <br/>
                        <input type='text' defaultValue={user ? user.email : ''} disabled={true}/>
                        <br/>

                        <button type='submit'>Save</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={signOut}>Log out</button>
                </div>

            </div>
        </div>
    );
}