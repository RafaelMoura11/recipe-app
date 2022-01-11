import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import searchAPIFromSearch from '../services';

function SearchBar() {
  const { searchBarValue, setSearchBarValue, setRecipes } = useContext(MyContext);
  const handleChange = ({ target: { name, value } }) => (
    setSearchBarValue({ ...searchBarValue, [name]: value })
  );

  const handleClick = async () => {
    const { meals, drinks } = await searchAPIFromSearch(
      searchBarValue['search-bar-option'],
      searchBarValue['search-bar-value'], searchBarValue.page,
    );
    if (!meals && !drinks) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    return (meals ? setRecipes(meals) : setRecipes(drinks));
  };

  return (
    <div className="search-bar">
      <div onChange={ handleChange }>
        <input
          type="radio"
          value="Ingrediente"
          name="search-bar-option"
        />
        {' '}
        Ingrediente
        <input
          type="radio"
          value="Nome"
          name="search-bar-option"
        />
        {' '}
        Nome
        <input
          type="radio"
          value="Primeira letra"
          name="search-bar-option"
        />
        {' '}
        Primeira letra
      </div>
      <div>
        <input
          type="text"
          onChange={ handleChange }
          name="search-bar-value"
        />
        <button
          type="button"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
