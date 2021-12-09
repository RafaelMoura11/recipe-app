import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [searchBar, setSearchBar] = useState(true);

  const searchBarState = {
    searchBar,
  };

  return (
    <div>
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
        Explorar
      </h1>
      <SearchBar searchBarState={ searchBarState } />
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
      {/* {searchBar
        && <input type="text" data-testid="search-input" />} */}
    </div>
  );
}
