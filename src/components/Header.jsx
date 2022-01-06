import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, enable = true }) {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <div className="header-wrap">
      <div className="header">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1
          data-testid="page-title"
        >
          {title}
        </h1>
        {enable
        && (
          <button
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              src={ searchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      {searchBar
        && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  enable: PropTypes.bool.isRequired,
};
