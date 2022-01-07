import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import cooking from '../images/cooking.svg';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  // test email
  // https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs/39425165
  useEffect(() => {
    const minSize = 6;
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
    if (testEmail.test(email) && password.length > minSize) {
      setDisable(false);
    }
  }, [email, password]);

  return (
    <div className="login-screen">
      <div className="logo">
        <img src={ cooking } alt="wooman cooking logo" />
        <h2>Login</h2>
        <div className="line" />
      </div>
      <div className="login">
        <input
          type="email"
          data-testid="email-input"
          onChange={ handleEmail }
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ handlePassword }
          placeholder="Password"
          id="password"
        />
        <button
          type="button"
          onClick={ handleClick }
          data-testid="login-submit-btn"
          disabled={ disable }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
