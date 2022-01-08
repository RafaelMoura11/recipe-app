import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { requestRecommendedRecipes } from '../services';

export default function Footer({ fixed = false }) {
  const { setRecipes } = useContext(MyContext);

  const getFoodRecipes = async () => {
    const initialRecipes = await requestRecommendedRecipes('bebidas');
    setRecipes(initialRecipes);
  };

  const getDrinkRecipes = async () => {
    const initialRecipes = await requestRecommendedRecipes('comidas');
    setRecipes(initialRecipes);
  };

  return (
    <div data-testid="footer" className={ fixed ? 'fixed' : 'footer' }>
      <Link to="/bebidas" onClick={ getDrinkRecipes }>
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas" onClick={ getFoodRecipes }>
        <img
          src={ mealIcon }
          alt="mealIcon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

Footer.defaultProps = {
  fixed: false,
};

Footer.propTypes = {
  fixed: PropTypes.bool,
};
