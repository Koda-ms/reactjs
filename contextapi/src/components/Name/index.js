import { useContext } from "react";
import { UserContext } from "../../contexts/userProvider";

function Name(){
    const { students, setStudents } = useContext(UserContext);

    return(
      <div>
        <span>Hello! Welcome, {students}</span>
        <br/>
        <button onClick={() => setStudents('Rafaela')}>Change Name</button>
      </div>
    );
  
  }
  
  export default Name;