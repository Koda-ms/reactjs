import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';
import Repository from './pages/Repository';
import { ToastContainer } from "react-toastify";

function App(){

    return(
        <BrowserRouter>
            <ToastContainer autoClose={3000}/>
            <Routes>
                <Route path='/' element={ <Main/> }/>
                <Route path='/repository/:repository' element={ <Repository/> }/>
            </Routes>
        </BrowserRouter>
    );

}

export default App;