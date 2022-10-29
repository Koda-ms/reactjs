import { Link } from 'react-router-dom';
import './header.css';

function Header(){
    return(
        <header>
            <h1>Blog de Nutrição</h1>

            <div clasName='menu'>
                <Link to='/'>Home</Link>
                <Link to='/about'>Sobre</Link>
                <Link to='/contact'>Contato</Link>
            </div>
        </header>
    );
}

export default Header;