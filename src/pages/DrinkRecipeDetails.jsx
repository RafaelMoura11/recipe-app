import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft } from 'react-icons/fa';
import { isNull } from 'lodash';
import getVideoId from 'get-video-id';
import { Link } from 'react-router-dom';
import { requestRecipeDetailsById, getAllIngredientsFromRecipe,
  requestRecommendedRecipes } from '../services';
import RecommendedRecipes from '../components/RecommendedRecipes';
import IngredientList from '../components/IngredientList';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';

export default function DrinkRecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [isRecipeInProgress, setIsRecipeInProgress] = useState(false);
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [youtubeId, setYoutubeId] = useState('');

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
      if (recipe.strVideo !== null) {
        setYoutubeId(() => getVideoId(recipe.strVideo));
      }
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
      <>
        <div className="recipe-page">
          <div className="header stick">
            <Link to="/bebidas"><FaChevronLeft /></Link>
            <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
            <p>{' '}</p>
          </div>
          <img
            data-testid="recipe-photo"
            src={ recipeDetails.strDrinkThumb }
            alt="Recipe"
            className="recipe-img"
          />
          <div className="favorite-name">
            <div className="buttons-recipe">
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
            </div>
            <h1 className="recipe-title">{recipeDetails.strDrink}</h1>
          </div>
          <span data-testid="recipe-category">{recipeDetails.strAlcoholic}</span>
          <div className="ingredient-list">
            <ul>
              <IngredientList ingredients={ ingredients } />
            </ul>
          </div>
          {youtubeId === '' ? null : <iframe
            src={ `https://www.youtube.com/embed/${youtubeId.id}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />}
          <p
            data-testid="instructions"
            className="instructions"
          >
            {recipeDetails.strInstructions}

          </p>
        </div>
        <div className="carousel">
          <RecommendedRecipes
            recommendedRecipes={ recommendedRecipes }
            recipe={ false }
          />
        </div>
        { stateOfThisRecipe() }
      </>
    ) : (
      <Loading />
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
