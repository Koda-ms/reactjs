import { Route, Redirect } from "react-router-dom";

export default function RouteWrapper({
    component: Component,
    isPrivate, //PROPERTY THAT IDENTIFIES IF A PAGE IS PRIVATE, THEREFORE, ONLY ACCESSED BY A LOGGED USER
    ...rest //THE REST OF PROPS THE COMPONENT HAS
}){

    const loading = false;
    const signed = false;

    if(loading){
        return(
            <div></div>
        );
    }

    //IF THERE'S NO LOGGING AND THE PAGE IS PRIVATE
    if(!signed && isPrivate){
        return <Redirect to='/signin'/>
    }
    //IF THERE'S LOGGING AND THE PAGE ISN'T PRIVATE
    if(signed && !isPrivate){
        return <Redirect to='/'/>
    }

    return(
        //PERSONALIZED ROUTE:
        //THIS ROUTE FIRST RECEIVES THE REST OF PROPERTIES
        //THEN IT RENDERS THE COMPONENT SETTED ABOVE ALONG WITH ITS PROPS
        <Route {...rest} 
        render={ props => ( <Component {...props} /> )} />

    );
}