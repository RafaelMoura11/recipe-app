import React from 'react';
import Ingredient from './Ingredient';

function IngredientList({ ingredients }) {
  return (
    ingredients.map((element, i) => (
      <Ingredient key={ i } index={ i } ingredient={ element } />
    ))
  );
}

export default IngredientList;
