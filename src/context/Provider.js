import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [searchBarValue, setSearchBarValue] = useState({
    'search-bar-option': '',
    'search-bar-value': '',
  });

  const statesAndFunctions = {
    searchBarValue,
    setSearchBarValue,
  }
  return (
    <MyContext.Provider value={ statesAndFunctions }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.isRequired,
};

// Testeee

export default Provider;
