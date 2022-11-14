import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteWrapper from './routes/Route';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <SignIn/> } />
        <Route path='/signup' element={ <SignUp/> } />
        {/* REACT-ROUTER-DOM V6'S ROUTES DOESN'T WORK WITH COMPONENTS DIFFERENT FROM <Route> AFTER <Routes>
            SO THE PRIVATE PAGES GOTTA BE SETTED INSIDE THE element={} */}
        <Route path='/home' element={ 
          <RouteWrapper component={ Home } isPrivate/>
        }/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;