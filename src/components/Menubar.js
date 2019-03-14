import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '~/state/canvas';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import Button from './Button';

import ss from './MenuBar.sass';

const MenuBar = ({ reset, undo, redo }) => (
  <div className={ss.menuBar}>
    <Button onClick={undo}><IoIosUndo /></Button>
    <Button onClick={redo}><IoIosRedo /></Button>
    {/* <Button onClick={reset}><IoMdDownload /></Button> */}
    <Button onClick={reset}>clear</Button>
    <Button>about</Button>
  </div>
);

MenuBar.propTypes = {
  reset: PropTypes.func,
  undo: PropTypes.func,
  redo: PropTypes.func,
};

export default connect(
  null,
  actions,
)(MenuBar);
