import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from './App';

import reducers from './reducers';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <CookiesProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </CookiesProvider>
    </Provider>
);