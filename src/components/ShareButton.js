import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ dataTestId, url }) {
  const [copyed, setCopy] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${url}`);
    setCopy(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="share-icon" data-testid={ dataTestId } />
      </button>
      { copyed && <p>Link copiado!</p> }
    </>
  );
}

ShareButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ShareButton;
