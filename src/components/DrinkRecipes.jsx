import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';
import MyContext from '../context/MyContext';

function DrinkRecipes({ recipes }) {
  const { category } = useContext(MyContext);
  const DOZE = 12;
  return (
    recipes.length === 1 && !category ? (
      <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />)
      : recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        (index < DOZE
          && (
            <Link
              to={ `/bebidas/${idDrink}` }
              key={ strDrink }
              className="recipe-card-wrap"
            >
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
