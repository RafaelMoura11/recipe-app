import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ url }) {
  const [copyed, setCopy] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${url}`);
    setCopy(true);
  };
  return (
    <>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { copyed && <p>Link copiado!</p> }
    </>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareButton;
