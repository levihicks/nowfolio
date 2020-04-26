import React, { useContext } from 'react';
import {doSignOut} from '../../firebase';
import {AuthContext} from '../../session';
import * as ROUTES from '../../constants/routes';
import { Redirect } from 'react-router-dom';

const Account = () => {

    const authContext = useContext(AuthContext);

    let content = (
        <div className="offset-2">
            <button onClick={doSignOut}>Sign Out</button>
        </div>
    );

    return (
        <React.Fragment>
            { authContext  ? content : <Redirect to={ROUTES.HOME} /> }
        </React.Fragment>
    )
};

export default Account;