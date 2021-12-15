import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import Ingredient from '../components/Ingredient';
import RecommendedRecipe from '../components/RecommendedRecipe';

export default function DrinkRecipeDetails({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  const SEIS = 6;

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
          {
            ingredients.map((element, i) => (
              <Ingredient key={ i } index={ i } ingredient={ element } />
            ))
          }

        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <p data-testid="video">Video</p>
        <div className="carousel">
          { recommendedRecipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
            (index < SEIS && (
              <Link to={ `/comidas/${idMeal}` } key={ index }>
                <RecommendedRecipe
                  recipeName={ strMeal }
                  recipeImage={ strMealThumb }
                  index={ index }
                  recipeCategory
                />
              </Link>))
          )) }
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
