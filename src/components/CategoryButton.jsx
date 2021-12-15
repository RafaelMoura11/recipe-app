import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { getRecipesByCategory, defaultRecipes } from '../services';

function CategoryButton({ categoryName }) {
  const { setRecipes, setCategory,
    category, searchBarValue: { page } } = useContext(MyContext);
  const handleClick = async () => {
    if (category === categoryName) {
      const recipes = await defaultRecipes(page);
      setCategory();
      setRecipes(recipes);
    } else {
      const recipes = await getRecipesByCategory(page, categoryName);
      setCategory(categoryName);
      setRecipes(recipes);
    }
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
