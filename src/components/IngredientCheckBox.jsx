import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { addIngredientInProgressRecipes, checkIngredientsInLocalStorage,
  removeIngredientInProgressRecipes } from '../services';
import MyContext from '../context/MyContext';

export default function IngredientCheckBox({ id, ingredient, ingredients }) {
  const PROGRESS = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { pathname } = useLocation();
  const page = pathname.split('/')[1];
  const [check, setCheck] = useState(checkIngredientsInLocalStorage(PROGRESS,
    ingredient, id, page));
  const { setIsAllIngredientsChecked } = useContext(MyContext);

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
    const translatePageToEnglish = {
      comidas: 'meals',
      bebidas: 'cocktails',
    };
    const pageInEnglish = translatePageToEnglish[page];
    setIsAllIngredientsChecked(ingredients.length === progress[pageInEnglish][id].length);
  });

  return (
    <li>
      <label
        htmlFor={ ingredient }
        className={ check && 'CheckBoxTrue' }
      >
        <input
          onClick={ handleCheckBox }
          id={ ingredient }
          type="checkbox"
          checked={ check }
        />
        { ingredient }
        :
      </label>
    </li>
  );
}

IngredientCheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  ingredients: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
};
