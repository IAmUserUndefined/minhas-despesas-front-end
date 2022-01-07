import React from 'react';
import { BrowserRouter } from "react-router-dom";

import AppContainer from "./styles/app";

import { AppRoutes } from "./routes";

const App = () => {
  return (
      <>
        <BrowserRouter>
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </BrowserRouter>
      </>
  );
}

export default App;