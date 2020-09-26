import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log('ACTION', action);
  next(action);
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));


const firebaseConfig = {
  apiKey: "AIzaSyA6JNscZrxUljcJACkCub_JC0LyKFVfois",
  authDomain: "reacttaskize.firebaseapp.com",
  databaseURL: "https://reacttaskize.firebaseio.com",
  projectId: "reacttaskize",
  storageBucket: "reacttaskize.appspot.com",
  messagingSenderId: "481880456843",
  appId: "1:481880456843:web:b241d8bb33cfad85da9e8e",
  measurementId: "G-NV0ZVPX9HK",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
<Provider store = {store}>
<App /></Provider>, document.getElementById("root"));
