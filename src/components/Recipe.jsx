import PropTypes from 'prop-types';
import React from 'react';

function Recipe({ recipeName, recipeImage, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ recipeImage } alt={ recipeName } />
      <h4 data-testid={ `${index}-card-name` }>{ recipeName }</h4>
    </div>
  );
}

Recipe.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Recipe;
