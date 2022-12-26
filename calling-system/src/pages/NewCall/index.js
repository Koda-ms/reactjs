import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/userAuth';
import firebase from '../../services/dbConnection';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2, FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './newCall.css';

function NewCall(){
    const[customers, setCustomers] = useState([]);
    const[loadCustomers, setLoadCustomers] = useState(true);
    const[customerSelected, setCustomerSelected] = useState(0); //POSITION 0 SET AS THE 1ST ONE TO BE SHOWN AS THE DEFAULT VALUE
    const[editCall, setEditCall] = useState(false);

    const[subject, setSubject] = useState('Support');
    const[status, setStatus] = useState('Open');
    const[complement, setComplement] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    //FIRST SEARCH ON THE APPLICATION TO KNOW IF THERE'S IS ANY CUSTOMERS
    //REGISTERED. IF 'YES', THE LIST RETURNED CONTAINS THE COMPANY'S NAME 
    //AND ID
    useEffect(() => {
        async function getCustomers(){
            //SEARCH IF THERE IS ANY LIST ON THE CUSTOMERS' COLLECTION
            await firebase.firestore().collection('customers').get()
            .then((snapshot) => {
                let list = [];

                //THE SNAPSHOT RUNS THE DOCUMENT ONE BY ONE, TAKING ONLY
                //THE REQUIRED INFORMATION
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        fantasyName: doc.data().fantasyName
                    })
                })

                if(list.length === 0){
                    console.log('No companies found');
                    setCustomers([{ id: "1", fantasyName: 'Freela'}]);
                    setLoadCustomers(false);
                    return;
                }
                setCustomers(list);
                setLoadCustomers(false);

                //IN CASE THE USER REQUIRES AN EDITION. SO, IF 
                //THERE IS AN ID (true), THE FUNCTION IS CALLED
                if(id){
                    handleEditionCall(list);
                }

            })
            .catch((error) => {
                console.log("There was an error ", error);
                setCustomers([{ id: "1", fantasyName: ''}]);
                setLoadCustomers(false);
            })
        }
        getCustomers();
    }, [id]);

    //CALLED WHEN A CLIENT IS SELECTED ON THE SELECT TAG
    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
        console.log('Clients selected index', e.target.value);
        console.log('Selected client', customers[e.target.value]);
    }

    //CALLED WHEN THE SUBJECT IS CHANGED 
    function handleChangeSubject(e){
        setSubject(e.target.value);
    }

    //CALLED WHEN THE STATUS IS CHANGED
    function handleStatusSelected(e){
        setStatus(e.target.value);
    }

    //CALLED WHEN THE REGISTRATION MUST BE DONE
    async function handleRegister(e){
        e.preventDefault();

        if(editCall){
            await firebase.firestore().collection('callings').doc(id).update({
                client: customers[customerSelected].fantasyName,
                clientId: customers[customerSelected].id,
                subject: subject,
                status: status,
                complement: complement,
                userId: user.uid
            })
            .then(() => {
                toast.success('Edition saved!');
                setCustomerSelected(0);
                setComplement('');
                navigate('/home');
            })
            .catch((error) => {
                toast.error('Ops! Error in call edition. Try again later.')
                console.log(error);
            })
            //IT SERVES TO STOP THE EXECUTION RIGHT HERE
            return;
        }
        
        //CREATING A NEW CALLING AND ADDING IT TO THE COLLECTION
        await firebase.firestore().collection('callings').add({
            created: new Date(),
            client: customers[customerSelected].fantasyName,
            clientId: customers[customerSelected].id,
            subject: subject,
            status: status,
            complement: complement,
            userId: user.uid   //THE USER'S ID THAT TYPED THIS CALL
        })
        .then(() => {
            setCustomerSelected(0);
            setComplement('');
            toast.success('Calling created successefully');
        })
        .catch((error) => {
            toast.error('Ops, something got wrong');
            console.log(error);
        })
    }

    //THIS FUNCTION HANDLE THE EDITION BY TAKING A SNAPSHOT FROM THE LIST PRE-SETTED 
    //WITH IT THE DATA SENT TO EDITION IS THE REQUIRED ONE
    async function handleEditionCall(list){
        await firebase.firestore().collection('callings').doc(id).get()
        .then((snapshot) => {
            setSubject(snapshot.data().subject);
            setStatus(snapshot.data().status);
            setComplement(snapshot.data().complement);
            
            //TO SELECT THE CLIENT REQUIRED A SEARCH IS DONE IN THE LIST TO
            //BY ITS ID, SO CONSIDEREING THE ID FROM THE SNAPSHOT IT CAN BE DONE
            let index = list.findIndex(item => item.id === snapshot.data().clientId);
            setCustomerSelected(index);
            setEditCall(true);
        })
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                {editCall === true ? (
                    <Title name='Editing call'>
                        <FiEdit2 size={24}/>
                    </Title>
                ) : (
                    <Title name='New call'>
                        <FiPlusCircle size={24}/>
                    </Title>
                )}

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Client</label><br/>

                        {/*IF LOADCUSTOMERS IS 'TRUE' THEN AN "EMPTY" INPUT IS SHOWN, 
                        OTHERWISE IT SHOWS THE LIST WITH THE EXISTING VALUES*/}
                        {loadCustomers ? (
                            <input type='text' disabled={true} value='Loading clients...' />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customers.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.fantasyName}
                                        </option>
                                    )
                                })}
                            </select>
                        )}
                        <br/>

                        <label>Subject</label><br/>
                        <select value={subject} onChange={handleChangeSubject}>
                            <option value='Support'>Support</option>
                            <option value='Technical Visit'>Technical Visit</option>
                            <option value='Finnance'>Finnance</option>
                        </select><br/>

                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' 
                            name='radio' 
                            value='Open'
                            onChange={handleStatusSelected}
                            checked={status === 'Open'}/>
                            <span>Open</span>

                            <input type='radio' 
                            name='radio' 
                            value='Processing'
                            onChange={handleStatusSelected}
                            checked={status === 'Processing'}/>
                            <span>Processing</span>

                            <input type='radio' 
                            name='radio' 
                            value='Finished'
                            onChange={handleStatusSelected}
                            checked={status === 'Finished'}/>
                            <span>Finished</span>
                        </div>

                        <label>Complement</label><br/>
                        <textarea type='text' 
                        placeholder='Describe your situation (optional)'
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}/>
                    
                        {editCall === true ? (
                            <button type='submit'>Save</button>
                        ) : (
                            <button type='submit'>Register</button>
                        )}
                        

                    </form>
                </div>

            </div>
        </div>
    );

}

export default NewCall;