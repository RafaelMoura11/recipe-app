import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientCheckBox({ ingredient, index }) {
  const [check, setCheck] = useState(false);
  const handleCheckBox = ({ target: { checked } }) => {
    setCheck(checked);
  };
  return (
    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      className={ check && 'CheckBoxTrue' }
    >
      <input
        onClick={ handleCheckBox }
        id={ ingredient }
        type="checkbox"
      />
      { ingredient }
      :
    </label>
  );
}

IngredientCheckBox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
