import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIngredients } from '../services';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCards from '../components/IngredientCards';

export default function ExploreFoodsByIngredient({ location: { pathname } }) {
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState('');

  const getInfo = async () => {
    const isFood = /comidas/.test(pathname);
    const ingredients = await getIngredients('comidas');
    setPage(isFood ? 'comidas' : 'bebidas');
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

ExploreFoodsByIngredient.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};
