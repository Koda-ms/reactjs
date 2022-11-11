import { useState, createContext } from "react";

export const UserContext = createContext({}); //TO CREATE THE CONTEXT

//children MEANS THAT EVERY OTHER COMPONENT SURROUNDED BY THE PROVIDER
//MIGHT RECEIVE ITS VALUES
function UserProvider({children}) { 
    const[students, setStudents] = useState('Laila');
    
    return(
        <UserContext.Provider value={{ students, setStudents }}>
            {children}
        </UserContext.Provider>
    );

}

export default UserProvider;