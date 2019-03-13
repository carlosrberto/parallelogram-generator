import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '~/state/canvas';

import ss from './OptionsBar.sass';

const OptionsBar = ({ toggleAll, showAllParallelogram }) => (
  <div className={ss.optionsBar}>
    <input
      id="showAll"
      type="checkbox"
      onChange={toggleAll}
      value={showAllParallelogram}
    />
    <label
      htmlFor="showAll"
    >
      show all possible parallelograms
    </label>
  </div>
);

OptionsBar.propTypes = {
  toggleAll: PropTypes.func,
  showAllParallelogram: PropTypes.bool,
};

const mapStateToProps = state => ({
  showAllParallelogram: state.canvas.showAllParallelogram,
});

export default connect(
  mapStateToProps,
  actions,
)(OptionsBar);
