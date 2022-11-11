import Name from "../Name";
import { UserContext } from "../../contexts/userProvider";
import { useContext } from "react";

function Students(){
    const { students } = useContext(UserContext);

    return(
      <div>
        <h1>Student Component. Student's name: {students}</h1>
        <Name/>
      </div>
    );
  
  }
  
  export default Students;