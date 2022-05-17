import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import App from './app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          outline: 0
        },
        'html, body': {
          height: '100vh',
          border: 'none'
        },
        'body, input, button': {
          fontFamily: "'Roboto', sans-serif",
          fontSize: '15px'
        },
        'div':{
          display: 'flex'
        },
        '#root':{
          display: 'block',
          height: '100%'
        },
        'button': {
          width: '100%',
          height: '100%',
          border: 'none',
          cursor: 'pointer',
          padding: 8
        }
      }} />

    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();