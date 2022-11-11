import Students from "./components/Students";
import UserProvider from "./contexts/userProvider";

function App(){

  return(
    <UserProvider>
      <div>
        <h1>School</h1>
        <hr/>
        <Students/>
      </div>
    </UserProvider>
  );

}

export default App;