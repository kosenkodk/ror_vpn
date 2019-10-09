import React from 'react'
import ReactDOM from 'react-dom'

// import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './app_pack/_helpers';
import { App } from './app_pack/App';

// setup fake backend
// import { configureFakeBackend } from './app_pack/_helpers';
// configureFakeBackend();

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app_pack')
// );

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app_pack'),
  )
})
