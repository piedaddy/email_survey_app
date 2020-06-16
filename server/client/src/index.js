import React from "react";
import ReactDOM from "react-dom";
import 'materialize-css/dist/css/materialize.min.css'
import App from "./components/App";
import { Provider } from "react-redux"; //provider is a component! 
import { createStore, applyMiddleware } from "redux";
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
window.axios = axios;

//we want to pass all the reducers into createStore
const store = createStore(reducers, {}, applyMiddleware(reduxThunk) );

ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log('stripe_key is', process.env.REACT_APP_STRIPE_KEY);
console.log('environment is', process.env.NODE_ENV);
