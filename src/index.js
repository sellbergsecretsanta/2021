import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InstanceLoot from './InstanceLoot';
import * as serviceWorker from './serviceWorker';
import {Locations, Location} from 'react-router-component';

const routing = (
  <Locations>
    <Location path="/" handler={App} />
    <Location path="/loot" handler={InstanceLoot} />
  </Locations>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
