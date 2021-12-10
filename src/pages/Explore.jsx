import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" enable={ false } />
      <Link to="/explorar/comidas">
        <h3
          data-testid="explore-food"
        >
          Explorar Comidas
        </h3>
      </Link>
      <Link to="/explorar/bebidas">
        <h3
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </h3>
      </Link>
      <Footer />
    </div>
  );
}
