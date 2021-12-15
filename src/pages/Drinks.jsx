import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import DrinkRecipes from '../components/DrinkRecipes';
import { requestRecommendedRecipes, getCategoriesByPage } from '../services';
import AllCategoryButtons from '../components/AllCategoryButtons';

export default function Drinks() {
  const { searchBarValue, setSearchBarValue, recipes,
    setRecipes } = useContext(MyContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'bebidas' });
    async function initialFoodRecipes() {
      const initialRecipes = await requestRecommendedRecipes('comidas');
      setRecipes(initialRecipes);
      const allCategories = await getCategoriesByPage('bebidas');
      setCategories(allCategories);
    }
    initialFoodRecipes();
  }, []);

  return (
    <div>
      <Header title="Bebidas" />
      <AllCategoryButtons categories={ categories } />
      <DrinkRecipes recipes={ recipes } />
      <Footer />
    </div>
  );
}
