import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function DrinkRecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const checkIfRecipeIsAlreadyDone = (recipe) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const checkResponse = doneRecipes.some((doneRecipe) => (
        doneRecipe.id === recipe.idDrink));
      return setIsRecipeDone(checkResponse);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'bebidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('bebidas');
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
    return setIsRecipeInProgress(progress.cocktails[id]);
  }, [id]);

  const handleClick = () => {
    history.push(`/bebidas/${id}/in-progress`);
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
          src={ recipeDetails.strDrinkThumb }
          alt="Recipe"
        />
        <h3 data-testid="recipe-title">{recipeDetails.strDrink}</h3>
        <ShareButton url={ `/bebidas/${id}` } dataTestId="share-btn" />
        <FavoriteButton
          id={ recipeDetails.idDrink }
          type="bebida"
          area=""
          category={ recipeDetails.strCategory }
          alcoholicOrNot={ recipeDetails.strAlcoholic }
          name={ recipeDetails.strDrink }
          image={ recipeDetails.strDrinkThumb }
        />
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
        { stateOfThisRecipe() }
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
}

DrinkRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
  history: PropTypes.objectOf({
    push: PropTypes.func,
  }).isRequired,
};
