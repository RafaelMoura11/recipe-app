import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import Recipe from '../components/Recipe';

export default function Drinks() {
  const { searchBarValue, setSearchBarValue, recipes } = useContext(MyContext);
  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'bebidas' });
  }, []);
  const DOZE = 12;
  return (
    <div>
      <Header title="Bebidas" />
      { recipes.length === 1 ? <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />
        : recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          (index < DOZE
          && (
            <Link to={ `/bebidas/${idDrink}` } key={ strDrink }>
              <Recipe
                recipeName={ strDrink }
                recipeImage={ strDrinkThumb }
                index={ index }
              />
            </Link>)
          )
        )) }
      <Footer />
    </div>
  );
}
