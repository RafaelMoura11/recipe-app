import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import { useHistory } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import { getAllIngredientsFromRecipe, requestRecipeDetailsById,
  dateNow } from '../services';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../context/MyContext';

const copy = require('clipboard-copy');

export default function FoodRecipeProcess({ location, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [copyed, setCopy] = useState(false);
  const { isAllIngredientsChecked, setIsAllIngredientsChecked } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    setIsAllIngredientsChecked(false);
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'comidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
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

  const handleShare = () => {
    copy(`http://localhost:3000${location.pathname}`);
    setCopy(true);
  };

  const finishingRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = {
      id: recipeDetails.idMeal,
      type: 'comida',
      area: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strMeal,
      img: recipeDetails.strMealThumb,
      doneDate: dateNow(),
      tags: recipeDetails.strTags,
    };
    if (isNull(doneRecipes)) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
      return history.push('/receitas-feitas');
    }
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    history.push('/receitas-feitas');
  };

  return (
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
      <IngredientList ingredients={ ingredients } progress id={ id } />
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <p data-testid="video">Video</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        className="start-btn"
        disabled={ !isAllIngredientsChecked }
        onClick={ finishingRecipe }
      >
        Finalizar receita
      </button>
    </div>
  );
}

FoodRecipeProcess.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
