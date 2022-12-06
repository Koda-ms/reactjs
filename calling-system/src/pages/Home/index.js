
import Header from '../../components/Header';
import Title from "../../components/Title";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './home.css';

function Home(){
    const[customers, setCustomers] = useState([]);

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Callings'>
                    <FiMessageSquare size={25}/>
                </Title>
                {/* IF THERE'S NO CALLINGS AVAILABLE IN THE SYSTEM */}
                {customers.length === 0 ? (
                   <div className='container dashboard'>
                        <span>No callings found</span>
                        <Link to='/newCall' className='new'>
                            <FiPlus size={25} color='#FFF'/>
                            New Call
                        </Link>
                    </div> 
                ) : (
                    <>
                    <Link to='/newCall' className='new'>
                        <FiPlus size={25} color='#FFF'/>
                        New Call
                    </Link>
                    </>
                )}
                
            </div>
        </div>
    );

}

export default Home;