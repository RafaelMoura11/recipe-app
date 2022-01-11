import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredient({ ingredient }) {
  return (
    <li>{ ingredient }</li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
};
