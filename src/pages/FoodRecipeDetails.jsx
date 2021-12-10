import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import Ingredient from '../components/Ingredient';
import RecommendedRecipe from '../components/RecommendedRecipe';

export default function FoodRecipeDetails({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      setRecommendedRecipes(recommendedRecipesResponse);
    };
    getRecipe();
  }, []);
  const SEIS = 6;
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
          {
            ingredients.map((element, i) => (
              <Ingredient key={ i } index={ i } ingredient={ element } />
            ))
          }

        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <p data-testid="video">Video</p>
        <div>
          { recommendedRecipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            (index < SEIS && (
              <Link to={ `/bebidas/${idDrink}` } key={ index }>
                <RecommendedRecipe
                  recipeName={ strDrink }
                  recipeImage={ strDrinkThumb }
                  index={ index }
                  recipeCategory
                />
              </Link>))
          )) }

        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
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
