import React from 'react';
import { BrowserRouter } from "react-router-dom";

import AppContainer from "./styles/app";

import { AppRoutes, ModalRoute } from "./routes";

const App = () => {
  return (
      <>
        <BrowserRouter>
          <AppContainer>
            <ModalRoute />
            <AppRoutes />
          </AppContainer>
        </BrowserRouter>
      </>
  );
}

export default App;