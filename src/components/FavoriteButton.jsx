import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import React, { useState } from 'react';
import { addRecipeInFavoriteRecipes, checkRecipeInFavoriteRecipes,
  removeRecipeFromFavoriteRecipes } from '../services';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ id, type, area, category, alcoholicOrNot, name, image }) {
  const FAVORITE = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(id);
  const [isFavorite, setIsFavorite] = useState(
    checkRecipeInFavoriteRecipes(id, FAVORITE),
  );
  const addOrRemoveRecipeFromFavoriteRecipes = () => {
    console.log(id);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = {
      id,
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    if (isNull(favoriteRecipes)) {
      setIsFavorite(true);
      return localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteRecipe]));
    }
    if (!checkRecipeInFavoriteRecipes(id, favoriteRecipes)) {
      setIsFavorite(true);
      const newArrayOfFavoriteRecipes = addRecipeInFavoriteRecipes(favoriteRecipe,
        favoriteRecipes);
      return localStorage.setItem('favoriteRecipes',
        JSON.stringify(newArrayOfFavoriteRecipes));
    }
    setIsFavorite(false);
    const newArrayOfFavoriteRecipes = removeRecipeFromFavoriteRecipes(id,
      favoriteRecipes);
    return localStorage.setItem('favoriteRecipes',
      JSON.stringify(newArrayOfFavoriteRecipes));
  };
  return (
    <button
      type="button"
      onClick={ addOrRemoveRecipeFromFavoriteRecipes }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt="favorite-icon"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteButton;
