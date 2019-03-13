import React from 'react';
import ss from './OptionsBar.sass';

const OptionsBar = () => (
  <div className={ss.optionsBar}>
    <input id="showAll" type="checkbox" /> <label htmlFor="showAll">show all possible parallelograms</label>
  </div>
);

export default OptionsBar;
