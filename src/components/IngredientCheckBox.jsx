import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { addIngredientInProgressRecipes, checkIngredientsInLocalStorage,
  removeIngredientInProgressRecipes } from '../services';

export default function IngredientCheckBox({ id, ingredient, index }) {
  const [check, setCheck] = useState(false);
  const { pathname } = useLocation();
  const page = pathname.split('/')[1];

  const handleCheckBox = ({ target: { checked } }) => {
    setCheck(checked);
    const oldProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newProgress = (checked ? addIngredientInProgressRecipes(id, ingredient,
      oldProgress, page)
      : removeIngredientInProgressRecipes(id, ingredient, oldProgress, page));
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
  };

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isIngredientChecked = checkIngredientsInLocalStorage(progress,
      ingredient, id, page);
    setCheck(isIngredientChecked);
  }, []);

  return (
    <label
      htmlFor={ ingredient }
      className={ check && 'CheckBoxTrue' }
      data-testid={ `${index}-ingredient-step` }
    >
      <input
        onClick={ handleCheckBox }
        id={ ingredient }
        type="checkbox"
        defaultChecked={ check }
      />
      { ingredient }
      :
    </label>
  );
}

IngredientCheckBox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
