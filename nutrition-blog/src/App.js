import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'
import Contact from './pages/Contact';
import Header from './components/Header';
import NotFound from './pages/NotFound';

function App(){

  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/about' element={ <About/> }/>
        <Route path='/contact' element={ <Contact/> }/>

        <Route path='*' element={ <NotFound/> }/> {/* IN CASE THE USER GOES TO A NO EXISTING PAGE */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;