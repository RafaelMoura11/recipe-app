import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ButtonRecipiesMade from '../components/ButtonsRecipiesMade';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
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
    <div>
      <Header title="Receitas Feitas" enable={ false } />
      {
        buttons.map(([button, teste]) => (
          <ButtonRecipiesMade button={ button } teste={ teste } key={ teste } />))
      }
      { recipeDone && recipeDone
        .filter(({ type }) => type.includes(filterButtons))
        .map((element, index) => (
          <div key={ element.id }>
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
            <Link to={ `/${element.type}s/${element.id}` }>
              <img
                className="imageCards"
                alt={ `imagem${element.type}` }
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{element.name}</h2>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{element.doneDate}</p>
            <ShareButton
              url={ `/${element.type}s/${element.id}` }
              dataTestId={ `${index}-horizontal-share-btn` }
            />
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
          </div>
        ))}
    </div>
  );
}

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
