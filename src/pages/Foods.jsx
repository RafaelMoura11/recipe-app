import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import FoodRecipes from '../components/FoodRecipes';

export default function Foods() {
  const { searchBarValue, setSearchBarValue, recipes } = useContext(MyContext);
  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'comidas' });
  }, []);
  return (
    <div>
      <Header title="Comidas" />
      <FoodRecipes recipes={ recipes } />
      <Footer />
    </div>
  );
}
