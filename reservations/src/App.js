import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Header from './components/Header';

function App() {
  return(
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/reservation' element={ <Reservation/> }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;