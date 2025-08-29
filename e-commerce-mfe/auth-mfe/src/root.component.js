import React from 'react';
import App from "./App";
import { Provider } from 'react-redux';
import store from '../src/store/store'; 

export default function Root(props) {
  return (
    <Provider store={store}>
    <App />
  </Provider>
  )
}


