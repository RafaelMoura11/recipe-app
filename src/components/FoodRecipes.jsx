import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Recipe from './Recipe';
import MyContext from '../context/MyContext';

function FoodRecipes({ recipes }) {
  const { category } = useContext(MyContext);
  const DOZE = 12;
  return (
    recipes.length === 1 && !category ? (
      <Redirect to={ `/comidas/${recipes[0].idMeal}` } />)
      : recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
        (index < DOZE
          && (
            <Link
              to={ `/comidas/${idMeal}` }
              key={ strMeal }
              className="recipe-card-wrap"
            >
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
  recipes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default FoodRecipes;
