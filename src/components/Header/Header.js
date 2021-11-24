import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';

function Header(props) {
/*     const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    } */

    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <button className="btn btn-danger" onClick={() => handleLogout()}>Logga ut</button>
            )
        }
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/')
    }

    return(
        <nav className="navbar navbar-dark bg-dark-blue">
            <div className="row col-12 d-flex text-white">
                <span className="h3">
                    {localStorage.getItem(ACCESS_TOKEN_NAME) ? "Secret Santa" : "Login"}
                </span>
                <div className="ml-auto">
                    {renderLogout()}
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Header);