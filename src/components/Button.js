import React from 'react';
import PropTypes from 'prop-types';

import ss from './Button.sass';

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={ss.button}>{children}</button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
