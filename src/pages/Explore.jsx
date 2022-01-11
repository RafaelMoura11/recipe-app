import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" enable={ false } />
      <div className="buttons">
        <Link to="/explorar/comidas">
          <button
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer fixed />
    </div>
  );
}
