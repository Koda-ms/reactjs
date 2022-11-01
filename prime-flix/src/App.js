import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';

function App(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/movie/:id' element={ <Movie/> }/> {/* THE '/:id' HELPS TO SPECIFY A PRODUCT DINAMICALLY,
                                                          FOR EXAMPLE. iN THIS CASE, IT'S A MOVIE */}
        <Route path='/favorites' element={ <Favorites/> }/>
        
        <Route path='*' element={ <NotFound/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;