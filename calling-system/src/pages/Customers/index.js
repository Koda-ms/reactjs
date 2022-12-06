import { useState } from "react";
import { FiUser } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import './customers.css';

function Customers(){
    const[customer, setCustomer] = useState('');
    const[cnpj, setCnpj] = useState('');
    const[address, setAddress] = useState('');

    function handleAdd(e){
        e.preventDefault();
        alert("test");
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
                        <input type='text' placeholder='Your company name' value={customer} onChange={(e) => setCustomer(e.target.value)}/> <br/>

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