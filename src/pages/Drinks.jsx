import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import DrinkRecipes from '../components/DrinkRecipes';
import searchAPIFromSearch, { requestRecommendedRecipes,
  getCategoriesByPage } from '../services';
import AllCategoryButtons from '../components/AllCategoryButtons';

export default function Drinks() {
  const { searchBarValue, setSearchBarValue, recipes,
    setRecipes, ingredient } = useContext(MyContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'bebidas' });
    async function initialDrinkRecipes() {
      const allCategories = await getCategoriesByPage('bebidas');
      setCategories(allCategories);
      if (ingredient !== 'all') {
        const recipesByIngredient = await searchAPIFromSearch('Ingrediente',
          ingredient, 'bebidas');
        const values = Object.values(recipesByIngredient);
        return setRecipes(values[0]);
      }
      if (!recipes.length) {
        const initialRecipes = await requestRecommendedRecipes('comidas');
        setRecipes(initialRecipes);
      }
    }
    initialDrinkRecipes();
  }, []);

  return (
    recipes.length
      ? (
        <div>
          <Header title="Bebidas" />
          <AllCategoryButtons categories={ categories } />
          <DrinkRecipes recipes={ recipes } />
          <Footer />
        </div>
      ) : (<p>Loading...</p>)
  );
}
