import './contact.css';

function Contact(){
    return(
        <div className='cont-container'>
            <h3 className='cont-title'>Como posso te ajudar?</h3>
            <input type='name' value='Nome'/>
            <input type='email' value='Email'/>
            <textarea type='text' value='Descrição'></textarea>
            <button type='submit'>Enviar</button>
            <div className='nutri-container'>
                <img src={require('../../assets/nutritionist.png')} alt=''/>
            </div>
        </div>
    );
}

export default Contact;