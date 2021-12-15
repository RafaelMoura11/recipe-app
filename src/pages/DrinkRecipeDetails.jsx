import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';

export default function DrinkRecipeDetails({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'bebidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('bebidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      setRecommendedRecipes(recommendedRecipesResponse);
    };
    getRecipe();
  }, [id]);

  return (
    (
      recipeDetails
    && (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strDrinkThumb }
          alt="Recipe"
        />
        <h3 data-testid="recipe-title">{recipeDetails.strDrink}</h3>
        <button type="button" data-testid="share-btn">Share</button>
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
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
        >
          Iniciar receita
        </button>
      </div>
    )
    )
  );
}

DrinkRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
