import './modal.css';
import { FiX } from 'react-icons/fi';

function Modal({ content, close }){

    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                   <FiX size={23} color='#FFF'/> 
                   Voltar
                </button>
            
                <div>
                    <h2>Calling details</h2> 
                    
                    <div className='row'>
                        <span>
                            Client: <a>{content.client}</a>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Subject: <a>{content.subject}</a>
                        </span>

                        <span>
                            Signed in: <a>{content.formatedDate}</a>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status: <a style={{color: '#FFF', backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999'}}>{content.status}</a>
                        </span>
                    </div>

                    {content.complement !== '' && (
                    <>
                        <h3>Complement</h3>
                        <p>{content.complement}</p>
                    </>
                    )}
                    
                </div>
            </div>
        </div>
    );

}

export default Modal;