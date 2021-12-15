import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';

export default function FoodRecipeDetails({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  // const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('comidas');
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
          src={ recipeDetails.strMealThumb }
          alt="Recipe"
        />
        <h3 data-testid="recipe-title">{recipeDetails.strMeal}</h3>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <h4 data-testid="recipe-category">{recipeDetails.strCategory}</h4>
        <ul>
          <IngredientList ingredients={ ingredients } />
        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <p data-testid="video">Video</p>
        <div className="carousel">
          <RecommendedRecipes recommendedRecipes={ recommendedRecipes } recipe />
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

FoodRecipeDetails.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
