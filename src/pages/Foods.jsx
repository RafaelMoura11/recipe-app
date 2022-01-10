import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import FoodRecipes from '../components/FoodRecipes';
import searchAPIFromSearch, { requestRecommendedRecipes,
  getCategoriesByPage } from '../services';
import AllCategoryButtons from '../components/AllCategoryButtons';
import Loading from '../components/Loading';

export default function Foods() {
  const { searchBarValue, setSearchBarValue, recipes,
    setRecipes, ingredient } = useContext(MyContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'comidas' });
    async function initialFoodRecipes() {
      const allCategories = await getCategoriesByPage('comidas');
      setCategories(allCategories);
      if (ingredient !== 'all') {
        const recipesByIngredient = await searchAPIFromSearch('Ingrediente',
          ingredient, 'comidas');
        const values = Object.values(recipesByIngredient);
        return setRecipes(values[0]);
      }
      if (!recipes.length) {
        const initialRecipes = await requestRecommendedRecipes('bebidas');
        setRecipes(initialRecipes);
      }
    }
    initialFoodRecipes();
  }, []);

  return (
    recipes.length
      ? (
        <div>
          <Header title="Comidas" />
          <AllCategoryButtons categories={ categories } />
          <FoodRecipes recipes={ recipes } />
          <Footer />
        </div>
      ) : (
        <Loading />
      )
  );
}
