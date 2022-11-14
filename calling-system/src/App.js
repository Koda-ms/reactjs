import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/userAuth';
import RouteWrapper from './routes/Route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

function App(){

  return(
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3000}/>
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
    </AuthProvider>
  );

}

export default App;