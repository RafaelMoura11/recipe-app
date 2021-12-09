import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Router />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
