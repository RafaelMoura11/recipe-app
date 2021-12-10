import PropTypes from 'prop-types';
import React from 'react';

function RecommendedRecipe({ recipeName, recipeImage, index, recipeCategory }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ recipeImage } alt={ recipeName } />
      <h4 data-testid={ `${index}-card-name` }>{ recipeName }</h4>
      <h5 data-testid={ `${index}-recomendation-card` }>{ recipeCategory }</h5>
    </div>
  );
}

RecommendedRecipe.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeCategory: PropTypes.string.isRequired,
};

export default RecommendedRecipe;
