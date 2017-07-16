import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignPage from './SignPage.jsx'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Profile from './Profile.jsx'
// import { 

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/sign_page" component={SignPage} />
            <Route path="/profile" component={Profile} />
        </div>
    </BrowserRouter>
    ), document.getElementById('root'));
registerServiceWorker();
