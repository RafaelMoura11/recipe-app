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
        .map((element) => (
          <Link
            to={ `/${element.type}s/${element.id}` }
            key={ element.id }
            className="recipe-card-wrap"
          >
            <div className="recipe-card">
              <img
                alt={ `imagem${element.type}` }
                src={ element.image }
              />
              <div className="card-content">
                <h2>{element.name}</h2>
                <span>done on</span>
                <p>{element.doneDate}</p>
                {
                  element.tags
                    .map((tag) => (
                      <p
                        key={ tag }
                      >
                        {tag}
                      </p>
                    ))
                }
                {
                  element.area ? (
                    <p>
                      {`${element.area} - ${element.category}`}
                    </p>
                  )
                    : (
                      <p>
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
