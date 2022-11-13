import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

export default function Routes(){
    return(
        //ALLOWS ONLY 1 RENDERED COMPONENT AT ONCE
        <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/' component={Home} isPrivate/>
        </Switch>

    );
}