import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from '../../services/dbConnection';
import './customers.css';

function Customers(){
    const[fantasyName, setFantasyName] = useState('');
    const[cnpj, setCnpj] = useState('');
    const[address, setAddress] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        
        if(fantasyName !== '' && cnpj !== '' && address !== ''){
            await firebase.firestore().collection("customers").add({
                fantasyName: fantasyName,
                cnpj: cnpj,
                address: address
            })
            .then(() => {
                setFantasyName('');
                setCnpj('');
                setAddress('');
                toast.info("Company resgistered successfully");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Something went wrong. Please, try again.")
            })
        } else {
            toast.error("Fill in all fields");
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name="Customers">
                    <FiUser size={25}/>
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleAdd}>
                        <label>Fantasy Name</label> <br/>
                        <input type='text' placeholder='Your company name' value={fantasyName} onChange={(e) => setFantasyName(e.target.value)}/> <br/>

                        <label>CNPJ</label> <br/>
                        <input type='text' placeholder='Your CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)}/> <br/>

                        <label>Address</label> <br/>
                        <input type='text' placeholder='Company address' value={address} onChange={(e) => setAddress(e.target.value)}/> <br/>

                        <button type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Customers;