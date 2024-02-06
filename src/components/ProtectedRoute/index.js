import React from 'react'
import Cookies from 'js-cookie'
import {Redirect,Route} from "react-router-dom"

const ProtectedRoute = (props) => {
    const jwtToken = Cookies.get("jwt_token")
    if(jwtToken === undefined){
        return <Redirect to="/"/>
    }
    return <Route {...props}/>
}

export default ProtectedRoute