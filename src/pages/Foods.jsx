import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Recipe from '../components/Recipe';

export default function Foods() {
  const { searchBarValue, setSearchBarValue, recipes } = useContext(MyContext);
  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'comidas' });
  }, []);
  return (
    <div>
      <Header title="Comidas" />
      { recipes.length === 1 ? <Redirect to={ `/comidas/${recipes[0].idMeal}` } />
        : recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link to={ `/comidas/${idMeal}` } key={ strMeal }>
            <Recipe
              recipeName={ strMeal }
              recipeImage={ strMealThumb }
              index={ index }
            />
          </Link>
        )) }
    </div>
  );
}
