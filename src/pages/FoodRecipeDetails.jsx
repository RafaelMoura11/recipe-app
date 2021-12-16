import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FoodRecipeDetails({ history,
  location, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [copyed, setCopy] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      const recommendedRecipesResponse = await requestRecommendedRecipes('comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      setRecommendedRecipes(recommendedRecipesResponse);
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('onProgress'));
    if (progress === null) {
      setProgressList([]);
    } else {
      setProgressList(progress);
    }
  }, [id]);

  const handleClick = () => {
    localStorage.setItem(
      'onProgress',
      JSON.stringify([...progressList, recipeDetails.idMeal]),
    );
    history.push(`/comidas/${id}/in-progress`);
  };

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopy(true);
  };

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
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        { copyed && <p>Link copiado!</p> }
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
          onClick={ handleClick }
        >
          Iniciar receita
        </button>
      </div>
    )
    )
  );
}

FoodRecipeDetails.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
