import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import FoodRecipes from '../components/FoodRecipes';
import { requestRecommendedRecipes, getCategoriesByPage } from '../services';
import AllCategoryButtons from '../components/AllCategoryButtons';

export default function Foods() {
  const { searchBarValue, setSearchBarValue, recipes,
    setRecipes } = useContext(MyContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'comidas' });
    async function initialFoodRecipes() {
      const initialRecipes = await requestRecommendedRecipes('bebidas');
      setRecipes(initialRecipes);
      const allCategories = await getCategoriesByPage('comidas');
      setCategories(allCategories);
    }
    initialFoodRecipes();
  }, []);

  return (
    <div>
      <Header title="Comidas" />
      <AllCategoryButtons categories={ categories } />
      <FoodRecipes recipes={ recipes } />
      <Footer />
    </div>
  );
}
