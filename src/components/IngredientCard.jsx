import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getIngredients } from '../services';
import MyContext from '../context/MyContext';

export default function IngredientCard({ page, index, strIngredient, strIngredient1 }) {
  const { setFilter, setIngredients } = useContext(MyContext);
  const [click, setClick] = useState(false);

  const filterByIngredient = async () => {
    const ingredient = page === 'comidas' ? strIngredient : strIngredient1;
    const recipes = await getIngredients(page);
    setFilter(ingredient);
    setIngredients(recipes);
  };

  let image = '';
  if (page === 'comidas') {
    image = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
  } else {
    image = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
  }

  return (
    <Link
      onClick={ async (event) => {
        event.preventDefault();
        await filterByIngredient();
        setClick(true);
      } }
      to={ page === 'comidas' ? '/comidas' : '/bebidas' }
    >
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <div
          data-testid={ `${index}-recipe-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt={ `${strIngredient} img` }
          />
          <h2
            data-testid={ `${index}-card-name` }
          >
            { page === 'comidas' ? strIngredient : strIngredient1 }
          </h2>
        </div>
        { click && <Redirect
          to={ page === 'comidas' ? '/comidas' : '/bebidas' }
        /> }
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  page: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  strIngredient: PropTypes.string.isRequired,
  strIngredient1: PropTypes.string.isRequired,
};
