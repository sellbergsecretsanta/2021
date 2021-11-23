import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.username,
            "password":state.password,
        }

        axios.get(API_BASE_URL + "/619bead00ddbee6f8b104f1b")
            .then(function (response) {
                if(response.status === 200){
                    let user = response.data.find(x => x.username === payload.username.trim().toLowerCase());

                    if (!user) {
                        props.showError("Username does not exists");
                    }
                    else if (user && user.password !== payload.password) {
                        props.showError("Username and password do not match");
                    }
                    else {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Login successful. Redirecting to home page..'
                        }))
                        let token = user.id;
                        localStorage.setItem(ACCESS_TOKEN_NAME,token);
                        redirectToHome();
                        props.showError(null)
                    }
                }
                else{
                    props.showError("Something went wrong");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    return(
        <div className="card col-md-6 col-sm-12 login-card p-3 mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputUsername1">Användarnamn</label>
                <input type="username"
                       className="form-control"
                       id="username"
                       aria-describedby="usernameHelp"
                       placeholder="Skriv användarnamn"
                       value={state.username}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Lösenord</label>
                <input type="password"
                       className="form-control"
                       id="password"
                       placeholder="Lösenord"
                       value={state.password}
                       onChange={handleChange}
                />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-dark-blue"
                    onClick={handleSubmitClick}
                >
                    Logga in
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(LoginForm);