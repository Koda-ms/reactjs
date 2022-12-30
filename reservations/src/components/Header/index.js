import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo-travel.png';
import './header.css';

function Header() {
    //THIS const DEALS ABOUT SHOWING VALUES ON SCEEN FROM THE REDUCER.
    //SO useSelector IS RESPONSIBLE FOR THAT. IT TAKES THE ENTIRE STORE
    //AS PARAMETER AND BY THAT IT'S POSSIBLE TO SELECT THE PART OF THE DATA WE WANT.
    const reserveSize = useSelector((store) => store.rootReducer.reserve.length);
  
    return(
        <div className='container'>
            <Link to='/'>
                <img src={logo} alt='logo'/>
                <h2>Landscape Travel</h2>
            </Link>

            <Link to='/reservation' className='reserve'>
                <div>
                    <strong>My reservations</strong>
                    <span>{reserveSize} reserves</span>
                </div>
            </Link>
        </div>

    );
}

export default Header;