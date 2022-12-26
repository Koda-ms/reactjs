import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './contexts/userAuth';
//import RouteWrapper from './routes/Route';
import PrivateRoutes from './routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Customers from './pages/Customers';
import NewCall from './pages/NewCall';

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer autoClose={3000}/>
        <Routes>
          <Route element={ <PrivateRoutes/> }>
            <Route element={ <Home/> } path='/home' exact/>
            <Route element={ <Profile/> } path='/settings'/>
            <Route element={ <Customers/> } path='/customers'/>
            <Route element={ <NewCall/> } path='/newCall'/>
            <Route element={ <NewCall/> } path='/newCall/:id'/>
          </Route>
          <Route path='/' element={ <SignIn/> } />
          <Route path='/signup' element={ <SignUp/> } />
          {/* REACT-ROUTER-DOM V6'S ROUTES DOESN'T WORK WITH COMPONENTS DIFFERENT FROM <Route> AFTER <Routes>
              SO THE PRIVATE PAGES GOTTA BE SETTED INSIDE THE element={} */}
          {/* <Route path='/home' element={ 
            //THE RouteWrapper IS NOT WORKING. GOTTA CHECK THAT LATER.
            <PrivateRoutes>
              <Home/>
            </PrivateRoutes>
          }/> */}
          {/* <Route path='/settings' element={ <Profile/> }/> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;