import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DrinkRecipeDetails({ history,
  location, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [copyed, setCopy] = useState(false);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'bebidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('bebidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      setRecommendedRecipes(recommendedRecipesResponse);
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isNull(progress)) {
      return setIsRecipeInProgress(false);
    }
    return setIsRecipeInProgress(progress.cocktails[id]);
  }, [id]);

  const handleClick = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

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
      <ul>
        <IngredientList ingredients={ ingredients } />
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <p data-testid="video">Video</p>
      <div className="carousel">
        <RecommendedRecipes
          recommendedRecipes={ recommendedRecipes }
          recipe={ false }
        />
      </div>
      { isRecipeInProgress ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
          onClick={ handleClick }
        >
          Continuar Receita
        </button>
      ) : (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
          onClick={ handleClick }
        >
          Iniciar Receita
        </button>
      ) }
    </div>
  );
}

DrinkRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
  history: PropTypes.objectOf({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
