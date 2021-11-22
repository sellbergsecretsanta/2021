import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import InstanceLoot from './InstanceLoot';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, NavLink } from 'react-router-dom'

const routing = (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
    <nav>
      <NavLink activeClassName="active" exact={true} to="/">Slots</NavLink>
      <NavLink activeClassName="active" to="/loot">Instances</NavLink>
    </nav>
    <Route exact path="/" component={App} />
    <Route path="/loot" component={InstanceLoot} />
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
