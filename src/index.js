import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { initialiseApp } from "./slices/ui";

import './fonts/sky-reg.woff';
import './fonts/sky-med.woff';
import './css/index.css';

store.dispatch(initialiseApp());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);