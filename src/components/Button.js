import React from 'react';
import PropTypes from 'prop-types';

import ss from './Button.sass';

const Button = ({
  onClick,
  children,
  disabled,
  title,
}) => (
  <button
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={ss.button}
  >
    {children}
  </button>
);

Button.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
