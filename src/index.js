import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStyle from "./styles/global";

import { MenuProvider } from "./providers/MenuProvider";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MenuProvider>
      <App />
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root')
);