import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStyle from "./styles/global";

import { MenuProvider } from "./providers/MenuProvider";
import { ModalProvider } from "./providers/ModalProvider";
import { AuthProvider } from "./providers/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MenuProvider>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </MenuProvider>
  </React.StrictMode>,
  document.getElementById('root')
);