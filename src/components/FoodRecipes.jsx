import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';

function FoodRecipes({ recipes }) {
  const DOZE = 12;
  return (
    recipes.length === 1 ? <Redirect to={ `/comidas/${recipes[0].idMeal}` } />
      : recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        (index < DOZE
          && (
            <Link to={ `/bebidas/${idMeal}` } key={ strMeal }>
              <Recipe
                recipeName={ strMeal }
                recipeImage={ strMealThumb }
                index={ index }
              />
            </Link>)
        )
      ))
  );
}

FoodRecipes.propTypes = {
  recipes: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

export default FoodRecipes;
