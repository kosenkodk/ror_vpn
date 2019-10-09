// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

// import React from 'react';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './app_pack/_helpers';
import { App } from './app_pack/App';

// setup fake backend
import { configureFakeBackend } from './app_pack/_helpers';
configureFakeBackend();

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

// const Hello = props => (
//   <div>app {props.name}!</div>
// )

// Hello.defaultProps = {
//   name: 'pack'
// }

// Hello.propTypes = {
//   name: PropTypes.string
// }

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Hello name="React" />,
//     document.getElementById('app_pack'),
//   )
// })
