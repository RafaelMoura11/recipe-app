import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function ButtonRecipiesMade({ button, teste }) {
  const { setFilterButtons } = useContext(MyContext);
  const handleClick = () => (
    setFilterButtons(button)
  );
  return (
    <button
      type="button"
      data-testid={ `filter-by-${teste.toLowerCase()}-btn` }
      onClick={ handleClick }
    >
      {teste}
    </button>
  );
}

ButtonRecipiesMade.propTypes = {
  button: PropTypes.string.isRequired,
  teste: PropTypes.shape({
    toLowerCase: PropTypes.func,
  }).isRequired,
};

export default ButtonRecipiesMade;
