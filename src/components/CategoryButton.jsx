import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { getRecipesByCategory } from '../services';

function CategoryButton({ categoryName }) {
  const { setRecipes, setCategory, searchBarValue: { page } } = useContext(MyContext);
  const handleClick = async () => {
    const recipes = await getRecipesByCategory(page, categoryName);
    setCategory(categoryName);
    setRecipes(recipes);
  };

  return (
    <button
      data-testid={ `${categoryName}-category-filter` }
      type="button"
      onClick={ handleClick }
    >
      { categoryName }
    </button>
  );
}

CategoryButton.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default CategoryButton;
