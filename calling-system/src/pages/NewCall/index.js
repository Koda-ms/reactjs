import { FiPlusCircle } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './newCall.css';

function NewCall(){

    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='New call'>
                    <FiPlusCircle size={24}/>
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label>Client</label><br/>
                        <select>
                            <option key={1} value={1}>Mariana Andrade</option>
                        </select><br/>

                        <label>Subject</label><br/>
                        <select>
                            <option key={1} value={1}>Support</option>
                            <option key={2} value={2}>Technical Visit</option>
                            <option key={3} value={3}>Finnance</option>
                        </select><br/>

                        <label>Status</label>
                        <div className='status'style={{backgroundColor: '#ad5'}}>
                            <input type='radio' name='radio' value='Open'/>
                            <span>Open</span> 

                            <input type='radio' name='radio' value='Processing'/>
                            <span>Processing</span>

                            <input type='radio' name='radio' value='Finished'/>
                            <span>Finished</span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );

}

export default NewCall;