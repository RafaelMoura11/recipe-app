import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIngredients } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCards from '../components/IngredientCards';

export default function ExploreDrinksByIngredient({ location: { pathname } }) {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState('');

  const getInfo = async () => {
    const isDrink = /bebidas/.test(pathname);
    const ingredients = await getIngredients('bebidas');
    setPage(isDrink ? 'bebidas' : 'comidas');
    setInfo(ingredients);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" enable={ false } />
      <div>
        { !!info.length && <IngredientCards info={ info } page={ page } /> }
      </div>
      <Footer />
    </div>
  );
}

ExploreDrinksByIngredient.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
