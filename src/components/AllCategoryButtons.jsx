import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CategoryButton from './CategoryButton';
import MyContext from '../context/MyContext';
import { defaultRecipes } from '../services';

function AllCategoryButtons({ categories }) {
  const { setRecipes, setCategory, searchBarValue: { page } } = useContext(MyContext);
  const CINCO = 5;
  const handleClick = async () => {
    const recipes = await defaultRecipes(page);
    setCategory();
    setRecipes(recipes);
  };
  return (
    <div className="buttons">
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleClick }
      >
        All
      </button>
      {categories.map(({ strCategory }, index) => (
        index < CINCO && <CategoryButton
          key={ strCategory }
          categoryName={ strCategory }
        />
      ))}
    </div>
  );
}

AllCategoryButtons.propTypes = {
  categories: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default AllCategoryButtons;
