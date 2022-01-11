import React, { useState, useContext, useEffect } from 'react';
import { requestRecommendedRecipes } from '../services';
import MyContext from '../context/MyContext';
import FoodRecipes from '../components/FoodRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFoodByArea() {
  const { recipes, setRecipes } = useContext(MyContext);
  const [areas, setAreas] = useState('');
  const [filter, setFilter] = useState('All');

  const getRecipesByArea = async () => {
    const fetchArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const apiResponse = await fetchArea.json();
    const area = Object.values(apiResponse)[0];
    setAreas(area);
  };

  const renderDropDown = () => {
    const options = areas.map(({ strArea }) => (
      <option
        value={ strArea }
        key={ strArea }
        onClick={ () => setFilter(strArea) }
      >
        { strArea }
      </option>
    ));

    return (
      <select
        value={ filter }
        onChange={ ({ target: { value } }) => {
          setFilter(value);
          console.log(value);
        } }
      >
        <option
          value="All"
        >
          All
        </option>
        { options }
      </select>
    );
  };

  const filterItens = async () => {
    if (filter !== 'All') {
      const AreaFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`)
        .then((response) => response.json())
        .then(({ meals }) => meals);
      setRecipes(AreaFetch.slice(0, +'12'));
    } else {
      const newRecipes = await requestRecommendedRecipes('bebidas');
      setRecipes(newRecipes);
    }
  };

  useEffect(() => {
    getRecipesByArea();
    filterItens();
  }, [filter]);

  return (
    <div>
      <Header title="Explorar Origem" />
      <div className="dropdown">
        { !!areas.length && renderDropDown() }
      </div>
      <div>
        { !!recipes.length && <FoodRecipes recipes={ recipes } /> }
      </div>
      <Footer />
    </div>
  );
}
