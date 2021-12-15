import React from 'react';
import CategoryButton from './CategoryButton';

function AllCategoryButtons({ categories }) {
  const CINCO = 5;
  return (
    (categories.map(({ strCategory }, index) => (
      index < CINCO && <CategoryButton
        key={ strCategory }
        categoryName={ strCategory }
      />
    )))
  );
}

export default AllCategoryButtons;
