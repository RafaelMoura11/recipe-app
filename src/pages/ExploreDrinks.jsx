import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  const [randomDrinkRecipeId, setRandomDrinkRecipeId] = useState();

  useEffect(() => {
    const getRandomDrinkRecipe = async () => {
      await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ drinks }) => setRandomDrinkRecipeId(drinks[0].idDrink));
    };
    getRandomDrinkRecipe();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" enable={ false } />
      <div>
        <div className="buttons">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              name="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${randomDrinkRecipeId}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              name="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </div>
      <Footer fixed />
    </div>
  );
}
