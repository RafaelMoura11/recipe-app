import PropTypes from 'prop-types';
import React from 'react';

function Recipe({ recipeName, recipeImage, index, recommend }) {
  return (
    <div
      data-testid={ recommend ? `${index}-recomendation-card` : `${index}-recipe-card` }
      className={ recommend ? 'recomended' : 'recipe-card' }
    >
      <img data-testid={ `${index}-card-img` } src={ recipeImage } alt={ recipeName } />
      <h4
        data-testid={ recommend ? `${index}-recomendation-title` : `${index}-card-name` }
      >
        { recipeName }

      </h4>
    </div>
  );
}

Recipe.defaultProps = {
  recommend: false,
};

Recipe.propTypes = {
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recommend: PropTypes.bool,
};

export default Recipe;
