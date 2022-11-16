import { useContext } from "react";
import { AuthContext } from "../../contexts/userAuth";
import Header from '../../components/Header';

function Home(){
    const { signOut, loadingAuth } = useContext(AuthContext);
   
    function handleLogOut(){
        signOut();
    }

    return(
        <div>
            <Header/>
        </div>
    );

}

export default Home;