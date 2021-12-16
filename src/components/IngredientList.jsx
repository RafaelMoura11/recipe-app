import React from 'react';
import Ingredient from './Ingredient';
import IngredientCheckBox from './IngredientCheckBox';

function IngredientList({ ingredients, progress, id }) {
  return (
    ingredients.map((element, i) => (
      progress ? <IngredientCheckBox
        key={ i }
        index={ i }
        ingredient={ element }
        id={ id }
      />
        : <Ingredient key={ i } index={ i } ingredient={ element } />
    ))
  );
}

export default IngredientList;
