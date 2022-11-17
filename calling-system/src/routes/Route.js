import { useContext } from "react";
import {  Navigate, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/userAuth";

function RouteWrapper({
    //component: Component,
    isPrivate, //PROPERTY THAT IDENTIFIES IF A PAGE IS PRIVATE, THEREFORE, ONLY ACCESSED BY A LOGGED USER
    //...rest //THE REST OF PROPS THE COMPONENT HAS
    children
}){
    const navigate = useNavigate();
    const { signed, loading } = useContext(AuthContext);
    console.log(signed)
    if(loading){
        return(
            <div></div>
        );
    }

    //IF THERE'S NO LOGGING AND THE PAGE IS PRIVATE
    if(!signed && isPrivate){
        console.log("oi2");
        <Navigate to='/'/>
        return;
    }
    //IF THERE'S LOGGING AND THE PAGE ISN'T PRIVATE
    if(signed && !isPrivate){
        console.log("oi");
        //<Navigate to='/home'/>
        navigate('/home', { replace: true });
        return;
    }

    // return(
    //     //PERSONALIZED ROUTE:
    //     //THIS ROUTE FIRST RECEIVES THE REST OF PROPERTIES
    //     //THEN IT RENDERS THE COMPONENT SETTED ABOVE ALONG WITH ITS PROPS
    //     <Route {...rest} 
    //     render={ props => ( <Component {...props} /> )} />

    // );
    return children;
}

export default RouteWrapper;