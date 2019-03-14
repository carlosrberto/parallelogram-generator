import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMousePoint, applyParentSize } from '~/shared/utils/dom';
import { isPointInsideCircle } from '~/shared/utils/geometry';
import { actions } from '~/state/canvas';
import { draw } from './Canvas.draw';

import ss from './Canvas.sass';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.pointIndex = null;

    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('mouseup', this.onMouseUp);
    this.drawCanvas = draw(this.canvas.current);
    this.renderCanvas();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  onWindowResize() {
    this.renderCanvas();
  }

  onClick(event) {
    if (this.props.points.length < 3) {
      const point = getMousePoint(this.canvas.current, event);
      this.props.addPoint({ point: [...point, 5.5] });
    }
  }

  onMouseDown(event) {
    const [px, py] = getMousePoint(this.canvas.current, event);
    this.props.points.find(([x, y, r], i) => {
      if (isPointInsideCircle(px, py, x, y, r)) {
        this.pointIndex = i;
        return true;
      }

      return false;
    });
  }

  onMouseMove(event) {
    if (
      this.pointIndex !== undefined
      && this.pointIndex !== null
      && this.pointIndex <= 2
      && this.props.points.length === 3
    ) {
      const [px, py] = getMousePoint(this.canvas.current, event);
      this.props.updatePoint({
        index: this.pointIndex,
        value: [px, py, 5.5],
      });
    }
  }

  onMouseUp() {
    if (this.pointIndex !== null && this.pointIndex !== undefined) {
      this.pointIndex = null;
      this.props.updateHistory();
    }
  }

  renderCanvas() {
    const { points, showAllParallelogram } = this.props;
    applyParentSize(this.canvas.current);
    this.drawCanvas({ points, showAllParallelogram });
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        className={ss.canvas}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onMouseDown}
        onTouchMove={this.onMouseMove}
        onTouchEnd={this.onMouseUp}
      />
    );
  }
}

Canvas.propTypes = {
  addPoint: PropTypes.func,
  updatePoint: PropTypes.func,
  updateHistory: PropTypes.func,
  points: PropTypes.array,
  showAllParallelogram: PropTypes.bool,
};

const mapStateToProps = state => ({
  points: state.canvas.points,
  showAllParallelogram: state.canvas.showAllParallelogram,
});

export default connect(
  mapStateToProps,
  actions,
)(Canvas);
