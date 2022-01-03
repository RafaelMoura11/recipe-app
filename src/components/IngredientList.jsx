import React from 'react';
import Ingredient from './Ingredient';
import IngredientCheckBox from './IngredientCheckBox';

function IngredientList({ ingredients, progress, id }) {
  return (
    ingredients.map((element, i, array) => (
      progress ? <IngredientCheckBox
        key={ i }
        index={ i }
        ingredient={ element }
        ingredients={ array }
        id={ id }
      />
        : <Ingredient key={ i } index={ i } ingredient={ element } />
    ))
  );
}

export default IngredientList;
