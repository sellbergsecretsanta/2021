import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import Textarea from '../Textarea/Textarea';

function Home(props) {
    const [currentUser , setCurrentUser] = useState(undefined);
    const [secretSanta , setSecretSanta] = useState(undefined);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function redirectToLogin() {
        props.history.push('/');
    }

    const getCurrentUser = () => {
        axios.get(API_BASE_URL + "/619beb2f62ed886f91531862/latest")
            .then(function (response) {
                if(response.status !== 200){
                    redirectToLogin()
                }

                let user = response.data.find(x => x.id === parseInt(localStorage.getItem(ACCESS_TOKEN_NAME)));

                if(!user) {
                    redirectToLogin()
                }
                else {
                    setCurrentUser(user);

                    if (user.secretsanta !== undefined && user.secretsanta !== null) {
                        setSecretSanta(response.data.find(x => x.id === user.secretsanta));
                    }
                }
            })
            .catch(function (error) {
                redirectToLogin()
            });
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

    const updateUserData = (updatedUsers) => {
        axios.put(API_BASE_URL + "/619beb2f62ed886f91531862", updatedUsers)
            .then(function (response) {
                setIsSaving(false);
                getCurrentUser();
            })
            .catch(function (error) {
                setIsSaving(false);
            });
    }

    const saveWishlist = async (text) => {
        setIsSaving(true);
        const oldUsers = await getUsers();
        const updatedUsers = oldUsers.map(p =>
            p.id === parseInt(localStorage.getItem(ACCESS_TOKEN_NAME))
            ?  { ...p, wishlist: text, lastUpdated: new Date()}
            : p
        );

        updateUserData(updatedUsers);
    }

    const handleRandomize = async () => {
        setIsSaving(true);
        const users = await getUsers();

        while (true) {
            let {successful, updatedUsers} = randomize(users);

            if (successful) {
                updateUserData(updatedUsers);
                break;
            }
        }
    }

    const randomize = (users) => {
        let usersCopy = [...users];

        var arr1 = usersCopy.slice(),
            arr2 = usersCopy.slice();

        arr1.sort(function() { return 0.5 - Math.random();});
        arr2.sort(function() { return 0.5 - Math.random();});

        while (arr1.length) {
            var user1 = arr1.pop(),
                user2 = arr2[0] === user1 ? arr2.pop() : arr2.shift();

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

    return(
        <div className="card col-md-6 col-sm-12 mt-4 p-3">
            <p className="mt-2">Skriv minst en sak du önskar dig</p>
            {currentUser && (
                <div className="row">
                    <div className="col-12">
                        <Textarea
                            wishlistText={currentUser.wishlist}
                            onSaveWishlist={(text) => saveWishlist(text)}
                            isSaving={isSaving}
                        />
                    </div>
                </div>
            )}

            {secretSanta && (
                <div className="row mt-4">
                    <div className="col-12">
                        <Textarea
                            name={secretSanta.name}
                            wishlistText={secretSanta.wishlist}
                            disabled
                        />
                    </div>
                </div>
            )}
            {localStorage.getItem(ACCESS_TOKEN_NAME) === "0" && (
                <button
                    className="btn btn-dark-blue mr-3"
                    onClick={() => {if(window.confirm('Vill du slumpa secret santa?')){handleRandomize()};}}>Assign secret santa
                </button>
            )}
        </div>
    )
}

export default withRouter(Home);