import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ButtonRecipiesMade from '../components/ButtonsRecipiesMade';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

export default function RecipesMade() {
  const [recipeDone, setRecipeDone] = useState([]);
  const { filterButtons } = useContext(MyContext);
  useEffect(() => {
    const recipesDoneStorage = () => JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipeDone(recipesDoneStorage);
  }, []);
  const buttons = [['', 'All'], ['comida', 'Food'], ['bebida', 'Drink']];
  return (
    <div className="done-recipe">
      <Header title="Receitas Feitas" enable={ false } />
      <div className="buttons">
        {
          buttons.map(([button, teste]) => (
            <ButtonRecipiesMade button={ button } teste={ teste } key={ teste } />))
        }
      </div>
      { recipeDone && recipeDone
        .filter(({ type }) => type.includes(filterButtons))
        .map((element, index) => (
          <Link
            to={ `/${element.type}s/${element.id}` }
            key={ element.id }
            className="recipe-card-wrap"
          >
            <div className="recipe-card">
              <img
                className="imageCards"
                alt={ `imagem${element.type}` }
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
              />
              <div className="card-content">
                <h2 data-testid={ `${index}-horizontal-name` }>{element.name}</h2>
                <span>done on</span>
                <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>
                {
                  element.tags
                    .map((tag) => (
                      <p
                        key={ tag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>
                    ))
                }
                {
                  element.area ? (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${element.area} - ${element.category}`}
                    </p>
                  )
                    : (
                      <p data-testid={ `${index}-horizontal-top-text` }>
                        {element.alcoholicOrNot}

                      </p>
                    )
                }
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
