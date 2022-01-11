import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, enable = true }) {
  const [searchBar, setSearchBar] = useState(false);
  const [active, setActive] = useState(false);

  const changeBg = () => {
    const PIXELS = 80;
    if (window.scrollY >= PIXELS) {
      setActive(true);
    } else setActive(false);
  };

  window.addEventListener('scroll', changeBg);

  return (
    <div className={ active ? 'header-wrap active' : 'header-wrap' }>
      <div className={ active ? 'header active' : 'header' }>
        <div>
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
        </div>
        <div>
          <h1>
            {title}
          </h1>
        </div>
        <div>
          {enable
        && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              src={ searchIcon }
              alt="Search Icon"
            />
          </button>
        )}
        </div>
      </div>
      {searchBar
        && <SearchBar />}
    </div>
  );
}

Header.defaultProps = {
  enable: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  enable: PropTypes.bool,
};
