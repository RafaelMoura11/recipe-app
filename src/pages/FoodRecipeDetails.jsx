import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function FoodRecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const checkIfRecipeIsAlreadyDone = (recipe) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const checkResponse = doneRecipes.some((doneRecipe) => (
        doneRecipe.id === recipe.idMeal));
      return setIsRecipeDone(checkResponse);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      checkIfRecipeIsAlreadyDone(recipe);
      setRecommendedRecipes(recommendedRecipesResponse);
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isNull(progress)) {
      return setIsRecipeInProgress(false);
    }
    return setIsRecipeInProgress(progress.meals[id]);
  }, [id]);

  const handleClick = () => {
    history.push(`/comidas/${id}/in-progress`);
  };

  const stateOfThisRecipe = () => {
    if (isRecipeDone) {
      return null;
    }
    if (isRecipeInProgress) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
          onClick={ handleClick }
        >
          Continuar Receita
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-btn"
        onClick={ handleClick }
      >
        Iniciar Receita
      </button>
    );
  };

  return (
    recipeDetails ? (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strMealThumb }
          alt="Recipe"
        />
        <h3 data-testid="recipe-title">{recipeDetails.strMeal}</h3>
        <ShareButton url={ `/comidas/${recipeDetails.idMeal}` } dataTestId="share-btn" />
        <FavoriteButton
          id={ recipeDetails.idMeal }
          type="comida"
          area={ recipeDetails.strArea }
          category={ recipeDetails.strCategory }
          alcoholicOrNot=""
          name={ recipeDetails.strMeal }
          image={ recipeDetails.strMealThumb }
          dataTestId="favorite-btn"
        />
        <h4 data-testid="recipe-category">{recipeDetails.strCategory}</h4>
        <ul>
          <IngredientList ingredients={ ingredients } />
        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <p data-testid="video">Video</p>
        <div className="carousel">
          <RecommendedRecipes
            recommendedRecipes={ recommendedRecipes }
            recipe
          />
        </div>
        { stateOfThisRecipe() }
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
}

FoodRecipeDetails.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
