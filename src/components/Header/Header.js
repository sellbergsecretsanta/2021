import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
/*    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Login'
    }
    else if(title.toLowerCase() === 'home') {
        title = 'Secret Santa';
    }*/

    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return(
        <nav className="navbar navbar-dark bg-dark-blue">
            <div className="row col-12 d-flex text-white">
                <span className="h3">
                    {localStorage.getItem(ACCESS_TOKEN_NAME) ? "Secret Santa" : "Login"}
                </span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);