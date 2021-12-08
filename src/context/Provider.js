import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  return (
    <MyContext.Provider>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.isRequired,
};

// Teste

export default Provider;
