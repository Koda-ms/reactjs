import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Private from './Private';

function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/admin' element={ <Private> <Admin/> </Private> }/> {/*THE PRIVATE COMPONENT IS ADDED TO VERIFY IF THE USER IS LOGGED */}
      </Routes>
    </BrowserRouter>
  );

}

export default App;