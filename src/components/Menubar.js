import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '~/state/canvas';
import { IoIosUndo, IoIosRedo } from 'react-icons/io';
import Button from './Button';
import Modal from './Modal';

import ss from './MenuBar.sass';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true,
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const {
      reset,
      undo,
      redo,
      historyIndex,
      history,
      points,
    } = this.props;

    return (
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
        <Button
          onClick={reset}
          disabled={points.length === 0}
        >
          reset
        </Button>
        <Button onClick={this.openModal}>about</Button>
        <Modal open={this.state.openModal} onClose={this.closeModal} />
      </div>
    );
  }
}

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
