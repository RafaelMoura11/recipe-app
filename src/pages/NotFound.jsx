import React from 'react';
import { useHistory } from 'react-router-dom';
import notFound from '../images/notFound.svg';

export default function NotFound() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/comidas');
  };

  return (
    <div className="not-found">
      <div>
        <img src={ notFound } alt="404 page note found" />
      </div>
      <div>
        <h1>Toma um cafézinho!</h1>
      </div>
      <div>
        <p>a pagina que você procurava não existe!</p>
      </div>
      <div className="not-found-button">
        <button
          type="button"
          onClick={ handleClick }
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}
