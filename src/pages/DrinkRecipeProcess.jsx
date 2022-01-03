import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import IngredientList from '../components/IngredientList';
import { getAllIngredientsFromRecipe, requestRecipeDetailsById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/MyContext';

const copy = require('clipboard-copy');

export default function DrinkRecipeProcess({ location, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copyed, setCopy] = useState(false);
  const { isAllIngredientsChecked, setIsAllIngredientsChecked } = useContext(MyContext);

  useEffect(() => {
    setIsAllIngredientsChecked(false);
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'bebidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isNull(progress)) {
      const firstProgress = { cocktails: { [id]: [] }, meals: {} };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(firstProgress));
    }
    if (!progress.cocktails[id]) {
      const updatedProgress = { ...progress,
        cocktails: { ...progress.cocktails, [id]: [] } };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(updatedProgress));
    }
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopy(true);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb }
        alt="Recipe"
      />
      <h3 data-testid="recipe-title">{recipeDetails.strDrink}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { copyed && <p>Link copiado!</p> }
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <h4 data-testid="recipe-category">{recipeDetails.strAlcoholic}</h4>
      <IngredientList ingredients={ ingredients } progress id={ id } />
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <p data-testid="video">Video</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-btn"
        disabled={ !isAllIngredientsChecked }
      >
        Finalizar receita
      </button>
    </div>
  );
}

DrinkRecipeProcess.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
