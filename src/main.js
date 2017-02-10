import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import './styles/main.css';
import { Provider } from 'react-redux';
import store from './store';


if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// disable ios chrome pull refresh
var startY = 0;
document.addEventListener('touchstart', function(e) {
  startY = e.touches[0].pageY;
});
document.addEventListener('touchmove', function(e) {
  if (document.body.scrollTop <= 0 && e.touches[0].pageY - startY > 0)  {
    e.preventDefault();
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
