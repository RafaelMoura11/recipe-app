import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" enable={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            name="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            name="explore-by-area"
            disabled
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to="/explorar/comidas/surpreenda">
          <button
            type="button"
            data-testid="explore-by-surprise"
            name="explore-by-surprise"
          >
            Me surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
