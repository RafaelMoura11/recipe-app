import React from 'react';
import Provider from './context/Provider';
import Router from './Router';

function App() {
  return (
    <Provider>
      <Router />
      <div>Opa</div>
    </Provider>
  );
}

export default App;
