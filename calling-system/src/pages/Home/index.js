import { useContext } from "react";
import { AuthContext } from "../../contexts/userAuth";
import Header from '../../components/Header';
import Title from "../../components/Title";

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