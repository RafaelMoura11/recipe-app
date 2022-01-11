import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import ButtonRecipiesMade from '../components/ButtonsRecipiesMade';
import MyContext from '../context/MyContext';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(savedItem);
  }, []);

  const removeRecipes = () => {
    const savedItem = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(savedItem);
  };
  const { filterButtons } = useContext(MyContext);
  const buttons = [['', 'All'], ['comida', 'Food'], ['bebida', 'Drink']];

  return (
    <div>
      <div>
        <Header title="Receitas Favoritas" enable={ false } />
        {
          buttons.map(([button, teste]) => (
            <ButtonRecipiesMade button={ button } teste={ teste } key={ teste } />))
        }
      </div>
      { favoriteRecipes && favoriteRecipes
        .filter(({ type }) => type.includes(filterButtons))
        .map((item, index) => (
          <div key={ item.id }>
            <div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  className="imageCards"
                  data-testid={ `${index}-horizontal-image` }
                  src={ item.image }
                  alt={ item.name }
                />
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  {item.name}
                </h2>
              </Link>
              { item.area ? (
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${item.area} - ${item.category}`}
                </h3>
              )
                : (
                  <>
                    <h3
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { item.alcoholicOrNot }
                    </h3>
                    <h3>
                      {item.category}
                    </h3>

                  </>
                )}
              <ShareButton
                dataTestId={ `${index}-horizontal-share-btn` }
                url={ `/${item.type}s/${item.id}` }
              />
              <div
                onKeyPress={ removeRecipes }
                role="button"
                onClick={ removeRecipes }
                tabIndex={ 0 }
              >
                <FavoriteButton
                  dataTestId={ `${index}-horizontal-favorite-btn` }
                  id={ item.id }
                  type={ item.type }
                  area={ item.area }
                  category={ item.category }
                  alcoholicOrNot={ item.alcoholicOrNot }
                  name={ item.name }
                  image={ item.image }
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  index: PropTypes.any,
}.isRequired;
