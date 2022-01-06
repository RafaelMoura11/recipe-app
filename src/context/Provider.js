import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [searchBarValue, setSearchBarValue] = useState({
    'search-bar-option': '',
    'search-bar-value': '',
    page: '',
  });

  const [recipes, setRecipes] = useState([]);

  const [category, setCategory] = useState();

  const [isAllIngredientsChecked, setIsAllIngredientsChecked] = useState(false);

  const [filter, setFilter] = useState('');

  const [ingredients, setIngredients] = useState([]);

  const [ingredient, setIngredient] = useState('all');

  const statesAndFunctions = {
    searchBarValue,
    setSearchBarValue,
    recipes,
    setRecipes,
    category,
    setCategory,
    isAllIngredientsChecked,
    setIsAllIngredientsChecked,
    filter,
    setFilter,
    ingredients,
    setIngredients,
    ingredient,
    setIngredient,
  };
  return (
    <MyContext.Provider value={ statesAndFunctions }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.isRequired,
};

// Testeee

export default Provider;
