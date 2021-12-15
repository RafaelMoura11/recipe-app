import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import DrinkRecipes from '../components/DrinkRecipes';

export default function Drinks() {
  const { searchBarValue, setSearchBarValue, recipes } = useContext(MyContext);
  useEffect(() => {
    setSearchBarValue({ ...searchBarValue, page: 'bebidas' });
  }, []);
  return (
    <div>
      <Header title="Bebidas" />
      <DrinkRecipes recipes={ recipes } />
      <Footer />
    </div>
  );
}
