import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Recipe from './Recipe';

function RecommendedRecipes({ recommendedRecipes, recipe }) {
  const SEIS = 6;
  return (
    (
      recipe ? recommendedRecipes.map(
        ({ idDrink, strDrink, strDrinkThumb }, index) => (
          (index < SEIS && (
            <Link to={ `/bebidas/${idDrink}` } key={ index }>
              <Recipe
                recipeName={ strDrink }
                recipeImage={ strDrinkThumb }
                index={ index }
                recommend
              />
            </Link>))
        ),
      ) : recommendedRecipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        (index < SEIS && (
          <Link to={ `/comidas/${idMeal}` } key={ index }>
            <Recipe
              recipeName={ strMeal }
              recipeImage={ strMealThumb }
              index={ index }
              recommend
            />
          </Link>))
      )))
  );
}

RecommendedRecipes.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default RecommendedRecipes;
