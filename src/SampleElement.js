import React from 'react';
import PropTypes from 'prop-types';

import styles from './SampleElement.sass';

const SampleElement = ({ children }) => (
  <p className={styles.wrapper}><strong>{children}</strong></p>
);

SampleElement.propTypes = {
  children: PropTypes.node,
};

export default SampleElement;
