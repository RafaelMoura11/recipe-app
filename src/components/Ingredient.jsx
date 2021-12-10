import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredient({ ingredient, index }) {
  return (
    <li data-testid={ `${index}-ingredient-name-and-measure` }>{ ingredient }</li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
