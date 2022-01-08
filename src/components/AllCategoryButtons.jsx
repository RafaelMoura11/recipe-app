import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import CategoryButton from './CategoryButton';
import MyContext from '../context/MyContext';
import { defaultRecipes } from '../services';

function AllCategoryButtons({ categories }) {
  const { setRecipes, setCategory, searchBarValue: { page } } = useContext(MyContext);
  const CINCO = 5;
  const handleClick = async () => {
    setRecipes([]);
    const recipes = await defaultRecipes(page);
    setCategory('');
    setRecipes(recipes);
  };
  return (
    <div className="buttons">
      <button
        type="button"
        data-testid="All-category-filter"
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
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AllCategoryButtons;
