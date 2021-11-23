import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    function renderRandom() {
        return(
            <button
                className="btn btn-light-blue mr-3"
                onClick={() => {if(window.confirm('Vill du slumpa secret santa?')){handleRandomize()};}}>Assign secret santa
            </button>
        )
    }

    function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <button className="btn btn-danger" onClick={() => handleLogout()}>Logga ut</button>
            )
        }
    }

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }

    async function handleRandomize() {
        const users = await getUsers();

        while (true) {
            let {successful, updatedUsers} = randomize(users);

            if (successful) {
                axios.put(API_BASE_URL + "/619beb2f62ed886f91531862", updatedUsers)
                    .then(function (response) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                break;
            }
        }
    }

    function randomize(users) {
        let usersCopy = [...users];

        var arr1 = usersCopy.slice(),
            arr2 = usersCopy.slice();

        arr1.sort(function() { return 0.5 - Math.random();});
        arr2.sort(function() { return 0.5 - Math.random();});

        while (arr1.length) {
            var user1 = arr1.pop(),
                user2 = arr2[0] == user1 ? arr2.pop() : arr2.shift();

            if (user1.partner === user2.partner) {
                return {successful: false, updatedUsers: users};
            }

            users = users.map(p =>
                p.id === user1.id
                ?  { ...p, secretsanta: user2.id }
                : p
            );
        }

        return {successful: true, updatedUsers: users};
    }

    const getUsers = async () => {
        return await axios.get(API_BASE_URL + "/619beb2f62ed886f91531862/latest")
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <nav className="navbar navbar-dark bg-dark-blue">
            <div className="row col-12 d-flex text-white">
                <span className="h3">
                    {localStorage.getItem(ACCESS_TOKEN_NAME) ? "Secret Santa" : "Login"}
                </span>
                <div className="ml-auto">
                    {localStorage.getItem(ACCESS_TOKEN_NAME) && localStorage.getItem(ACCESS_TOKEN_NAME) === "0" && renderRandom()}
                    {renderLogout()}
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Header);