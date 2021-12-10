import PropTypes from 'prop-types';
import React from 'react';

function RecommendedRecipe({ recipeName, recipeImage, index }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img data-testid={ `${index}-card-img` } src={ recipeImage } alt={ recipeName } />
      <h4 data-testid={ `${index}-recomendation-title` }>{ recipeName }</h4>
    </div>
  );
}

RecommendedRecipe.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecommendedRecipe;
