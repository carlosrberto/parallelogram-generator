import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '~/state/canvas';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import Button from './Button';
import Modal from './Modal';

import ss from './MenuBar.sass';

const MenuBar = ({
  reset,
  undo,
  redo,
  historyIndex,
  history,
  points,
}) => (
  <div className={ss.menuBar}>
    <Button
      title="undo"
      onClick={undo}
      disabled={historyIndex === 0}
    >
      <IoIosUndo />
    </Button>
    <Button
      title="redo"
      onClick={redo}
      disabled={historyIndex === history.length - 1}
    >
      <IoIosRedo />
    </Button>
    {/* <Button onClick={reset}><IoMdDownload /></Button> */}
    <Button
      onClick={reset}
      disabled={points.length === 0}
    >
      reset
    </Button>
    <Button>about</Button>
    <Modal show />
  </div>
);

MenuBar.propTypes = {
  reset: PropTypes.func,
  undo: PropTypes.func,
  redo: PropTypes.func,
  historyIndex: PropTypes.number,
  history: PropTypes.array,
  points: PropTypes.array,
};

const mapStateToProps = state => ({
  showAllParallelogram: state.canvas.showAllParallelogram,
  historyIndex: state.canvas.historyIndex,
  history: state.canvas.history,
  points: state.canvas.points,
});

export default connect(
  mapStateToProps,
  actions,
)(MenuBar);
