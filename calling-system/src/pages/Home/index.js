
import Header from '../../components/Header';
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './home.css';

function Home(){
    const[customers, setCustomers] = useState([1]);

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

                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Client</th>
                                <th scope='col'>Subject</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Signed in</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label='Client'>Mário Nascimento</td>
                                <td data-label='Subject'>Support</td>
                                <td data-label='Status'>
                                    <span className='badge' style={{backgroundColor: '#5cb85c'}}>Open</span>
                                </td>
                                <td data-label='Signed in'>12/20/2022</td>
                                <td data-label='#'>
                                    <button className='action' style={{backgroundColor: '#3583f6'}}>
                                        <FiSearch size={17} color='#FFF'/>
                                    </button>
                                    <button className='action' style={{backgroundColor: '#F6a935'}}>
                                        <FiEdit2 size={17} color='#FFF'/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    </>
                )}
                
            </div>
        </div>
    );

}

export default Home;