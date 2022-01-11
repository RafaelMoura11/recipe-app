import PropTypes from 'prop-types';
import React from 'react';

function Recipe({ recipeName, recipeImage, recommend }) {
  return (
    <div
      className={ recommend ? 'recomended' : 'recipe-card' }
    >
      <img src={ recipeImage } alt={ recipeName } />
      <h4>
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
  recommend: PropTypes.bool,
};

export default Recipe;
