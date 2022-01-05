import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';
import { useHistory } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import { getAllIngredientsFromRecipe, requestRecipeDetailsById,
  dateNow } from '../services';
import MyContext from '../context/MyContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function DrinkRecipeProcess({ match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredients, setIngredients] = useState();
  const { isAllIngredientsChecked, setIsAllIngredientsChecked } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    setIsAllIngredientsChecked(false);
    const getRecipe = async () => {
      const recipe = await requestRecipeDetailsById(id, 'bebidas');
      setIngredients(getAllIngredientsFromRecipe(recipe));
      setRecipeDetails(recipe);
    };
    getRecipe();
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (isNull(progress)) {
      const firstProgress = { cocktails: { [id]: [] }, meals: {} };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(firstProgress));
    }
    if (!progress.cocktails[id]) {
      const updatedProgress = { ...progress,
        cocktails: { ...progress.cocktails, [id]: [] } };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(updatedProgress));
    }
  }, [id]);

  const finishingRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = {
      id: recipeDetails.idDrink,
      type: 'bebida',
      area: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strDrink,
      img: recipeDetails.strDrinkThumb,
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
    recipeDetails ? (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strDrinkThumb }
          alt="Recipe"
        />
        <h3 data-testid="recipe-title">{recipeDetails.strDrink}</h3>
        <ShareButton url={ `/bebidas/${id}` } />
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
    ) : (
      <p>Loading...</p>
    )
  );
}

DrinkRecipeProcess.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.number,
  }).isRequired,
};
