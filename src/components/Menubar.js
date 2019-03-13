import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '~/state/canvas';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import Button from './Button';

import ss from './MenuBar.sass';

const MenuBar = ({ reset }) => (
  <div className={ss.menuBar}>
    <Button><IoIosUndo /></Button>
    <Button><IoIosRedo /></Button>
    <Button onClick={reset}>reset</Button>
    <Button>about</Button>
  </div>
);

MenuBar.propTypes = {
  reset: PropTypes.func,
};

export default connect(
  null,
  actions,
)(MenuBar);
