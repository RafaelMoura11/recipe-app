import PropTypes from 'prop-types';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';

function DrinkRecipes({ recipes }) {
  const DOZE = 12;
  return (
    recipes.length === 1 ? <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />
      : recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        (index < DOZE
          && (
            <Link to={ `/bebidas/${idDrink}` } key={ strDrink }>
              <Recipe
                recipeName={ strDrink }
                recipeImage={ strDrinkThumb }
                index={ index }
              />
            </Link>)
        )
      ))
  );
}

DrinkRecipes.propTypes = {
  recipes: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

export default DrinkRecipes;
