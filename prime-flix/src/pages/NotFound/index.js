import { Link } from "react-router-dom";
import './notFound.css';

function NotFound(){

    return(
        <div className="error">
            <h2>Ops! Page not found</h2>
            <Link to='/' className="home-link">Go back to the Home page</Link>
        </div>
    );
}

export default NotFound;