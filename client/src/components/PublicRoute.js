import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {_dashboard} from '../config/path';
import useAuthContext from '../hooks/useContext'

const PublicRoute = (props) =>{
    const {isAutenticated} = useAuthContext();

    if (isAutenticated) {
        return <Redirect to={_dashboard}/>
    }

    return <Route {...props} />
}

export default PublicRoute