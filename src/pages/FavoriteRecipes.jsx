/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
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
    <>
      <Header title="Receitas Favoritas" enable={ false } />
      <div className="buttons">
        {
          buttons.map(([button, teste]) => (
            <ButtonRecipiesMade button={ button } teste={ teste } key={ teste } />))
        }
      </div>
      { favoriteRecipes && favoriteRecipes
        .filter(({ type }) => type.includes(filterButtons))
        .map((item) => (
          <div key={ item.id } className="recipe-card-wrap">
            <div
              onKeyPress={ removeRecipes }
              role="button"
              onClick={ removeRecipes }
              tabIndex={ 0 }
              className="favorite"
            >
              <FavoriteButton
                id={ item.id }
                type={ item.type }
                area={ item.area }
                category={ item.category }
                alcoholicOrNot={ item.alcoholicOrNot }
                name={ item.name }
                image={ item.image }
              />
            </div>
            <Link to={ `/${item.type}s/${item.id}` }>
              <div className="recipe-card">
                <img
                  src={ item.image }
                  alt={ item.name }
                />
                <div className="card-content">
                  <h2>
                    {item.name}
                  </h2>
                  {item.area ? (
                    <h3>
                      {`${item.area} - ${item.category}`}
                    </h3>
                  )
                    : (
                      <>
                        <h3>
                          {item.alcoholicOrNot}
                        </h3>
                        <h3>
                          {item.category}
                        </h3>
                      </>
                    )}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}

FavoriteRecipes.propTypes = {
  index: PropTypes.any,
}.isRequired;
