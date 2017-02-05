import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './styles/main.css';
import { Provider } from 'react-redux';
import store from './store';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
