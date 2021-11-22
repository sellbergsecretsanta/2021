import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
//import { TextArea } from 'reactstrap';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import Textarea from '../Textarea/Textarea';

function Home(props) {
    const [currentUser , setCurrentUser] = useState(undefined);
    const [secretSanta , setSecretSanta] = useState(undefined);

/*    useEffect(() => {
        getCurrentUser();
    }, []);*/

    useEffect(() => {
      if (currentUser) {
          getSecretSanta();
      }
      else {
          getCurrentUser();
      }
    }, [currentUser]);

    function redirectToLogin() {
        props.history.push('/login');
    }

    const getCurrentUser = () => {
        axios.get(API_BASE_URL+'/users/' + localStorage.getItem(ACCESS_TOKEN_NAME))
            .then(function (response) {
                if(response.status !== 200){
                  redirectToLogin()
                }
                else {
                    setCurrentUser(response.data);
                }
            })
            .catch(function (error) {
              redirectToLogin()
            });
    }

    const getSecretSanta = () => {
        if (currentUser.secretsanta !== undefined && currentUser.secretsanta !== null) {
            axios.get(API_BASE_URL+'/users/' + currentUser.secretsanta)
                .then(function (response) {
                    setSecretSanta(response.data);
                })
                .catch(function (error) {
                });
        }
    }

    const saveWishlist = (text) => {
        let updated = { ...currentUser, wishlist: text };
        axios.put(API_BASE_URL+'/users/' + localStorage.getItem(ACCESS_TOKEN_NAME), updated)
            .then(function (response) {
                getCurrentUser();
            })
            .catch(function (error) {
            });
    }

    return(
        <>
            <p>Skriv minst en sak du önskar dig</p>
            {currentUser && (
                <div className="row">
                    <div className="mt-2 col-6">
                        <Textarea
                            wishlistText={currentUser.wishlist}
                            onSaveWishlist={(text) => saveWishlist(text)}
                        />
                    </div>
                </div>
            )}
            {secretSanta && (
                <div className="row">
                    <div className="mt-2 col-6">
                        <Textarea
                            name={secretSanta.name}
                            wishlistText={secretSanta.wishlist}
                            disabled
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default withRouter(Home);