import './about.css';

function About(){

    return(
        <div className='about-container'>
            <img src={require('../../assets/nutri.jpeg')} alt='' className='nutri'/>

            <p className='text'>Lorem Ipsum é simplesmente uma simulação de texto da indústria
                tipográfica e de impressos, e vem sendo utilizado desde o século
                XVI, quando um impressor desconhecido pegou uma bandeja de tipos
                e os embaralhou para fazer um livro de modelos de tipos. Lorem
                Ipsum sobreviveu não só a cinco séculos, como também ao salto
                para a editoração eletrônica, permanecendo essencialmente inalterado.</p>
        </div>
    );

}

export default About;