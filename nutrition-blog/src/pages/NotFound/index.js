import { Link } from 'react-router-dom';
import './notFound.css';

function NotFound(){

    return(
        <div className='error'>
            <h1>Ops! Parece que a página não existe.</h1>
            <Link to='/' className='link-home'>Voltar para a página inicial</Link>
        </div>
    );

}

export default NotFound;