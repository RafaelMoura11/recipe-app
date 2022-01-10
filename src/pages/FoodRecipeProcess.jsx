import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import getVideoId from 'get-video-id';
import { FaChevronLeft } from 'react-icons/fa';
import { isNull } from 'lodash';
import { useHistory } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import { getAllIngredientsFromRecipe, requestRecipeDetailsById,
  dateNow } from '../services';
import MyContext from '../context/MyContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';

export default function FoodRecipeProcess({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredients, setIngredients] = useState([]);
  const { isAllIngredientsChecked, setIsAllIngredientsChecked } = useContext(MyContext);
  const [youtubeId, setYoutubeId] = useState('');
  const history = useHistory();

  useEffect(() => {
    setIsAllIngredientsChecked(false);
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
      if (recipe.strYoutube !== '') {
        setYoutubeId(() => getVideoId(recipe.strYoutube));
      }
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isNull(progress)) {
      const firstProgress = { cocktails: {}, meals: { [id]: [] } };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(firstProgress));
    }
    if (!progress.meals[id]) {
      const updatedProgress = { ...progress,
        meals: { ...progress.meals, [id]: [] } };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(updatedProgress));
    }
  }, [id]);

  const finishingRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = {
      id: recipeDetails.idMeal,
      type: 'comida',
      area: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strMeal,
      image: recipeDetails.strMealThumb,
      doneDate: dateNow(),
      tags: (recipeDetails.strTags ? recipeDetails.strTags.split(',', 2) : []),
    };
    if (isNull(doneRecipes)) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
      return history.push('/receitas-feitas');
    }
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    history.push('/receitas-feitas');
  };

  return (
    recipeDetails ? (
      <>
        <div className="recipe-page">
          <div className="header stick">
            <button type="button" onClick={ history.goBack }>
              <FaChevronLeft />
            </button>
            <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
            <p>{' '}</p>
          </div>

          <img
            data-testid="recipe-photo"
            src={ recipeDetails.strMealThumb }
            alt="Recipe"
            className="recipe-img"
          />
          <div className="favorite-name">
            <div className="buttons-recipe">
              <ShareButton url={ `/comidas/${id}` } dataTestId="share-btn" />
              <FavoriteButton
                id={ recipeDetails.idMeal }
                type="comida"
                area={ recipeDetails.strArea }
                category={ recipeDetails.strCategory }
                alcoholicOrNot=""
                name={ recipeDetails.strMeal }
                image={ recipeDetails.strMealThumb }
              />
            </div>
            <h1
              data-testid="recipe-title"
            >
              {recipeDetails.strMeal}
            </h1>
          </div>
          <span data-testid="recipe-category">{recipeDetails.strCategory}</span>
          <div className="ingredient-list">
            <ul>
              <IngredientList ingredients={ ingredients } progress id={ id } />
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
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="start-btn"
          disabled={ !isAllIngredientsChecked }
          onClick={ finishingRecipe }
        >
          Finalizar receita
        </button>
      </>
    ) : (
      <Loading />
    )
  );
}

FoodRecipeProcess.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
