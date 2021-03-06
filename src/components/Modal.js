import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoIosUndo, IoIosRedo, IoIosCloseCircleOutline } from 'react-icons/io';
import Button from './Button';

import ss from './Modal.sass';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.modalRootEl = document.getElementById('modal-root');
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDocumentKeyUp = this.onDocumentKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onDocumentKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onDocumentKeyUp);
  }

  onDocumentKeyUp(event) {
    if (event.keyCode === 27 && this.props.open) {
      this.props.onClose(event);
    }
  }

  onOverlayClick(event) {
    if (event.target === this.ref.current) {
      this.props.onClose(event);
    }
  }

  render() {
    const { open, onClose } = this.props;
    return open ? ReactDOM.createPortal(
      <div ref={this.ref} className={ss.overlay} onClick={this.onOverlayClick}>
        <div className={ss.wrapper}>
          <div className={ss.modal}>
            <div className={ss.titleContent}>
              <h2 className={ss.aboutTitle}>About</h2>
              <button
                className={ss.closeButton}
                onClick={onClose}
              >
                <IoIosCloseCircleOutline />
              </button>
            </div>
            <div className={ss.content}>
            {/* eslint-disable max-len */}
              <h3
                className={`${ss.textTitle} ${ss.textCenter}`}
              >
                Parallelogram Generator
              </h3>
              <div className={ss.textWrapper}>
                <p>
                  The goal of this application is to draw a parallelogram based on three points selected by the user.
                  The application calculates the fourth parallelogram point and draws it. Along with the parallelogram
                  a circle with the same area and center of mass is drawn.
                </p>
              </div>
              <h3
                className={`${ss.textTitle} ${ss.textCenter}`}
              >
                How to use
              </h3>

              <div className={ss.textWrapper}>
                <ol className={ss.instructionsList}>
                  <li>Just click on three arbitrary points on the drawing area to draw a parallelogram.</li>
                  <li>You can resize it by dragging the three points around.</li>
                  <li>The points coordinates and the parallelogram area are shown.</li>
                  <li>You can use the <Button>reset</Button> button to clear the drawing area.</li>
                  <li>Use <Button><IoIosUndo /></Button> and <Button><IoIosRedo /></Button> buttons to rollback your changes.</li>
                  <li>Click on option &quot;<strong>show all possible parallelograms</strong>&quot; to see all fourth points.</li>
                </ol>
              </div>

              <h3
                className={`${ss.textTitle} ${ss.textCenter}`}
              >
                Author
              </h3>

              <div className={ss.textWrapper}>
                <p className={ss.textCenter}>
                  Developed by <strong>Carlos Roberto Gomes Junior</strong> under the <strong>MIT License</strong> <br />
                  <a
                    href="mailto:&#099;&#097;&#114;&#108;&#111;&#115;&#046;&#114;&#098;&#101;&#114;&#116;&#111;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;"
                  >
                    &#099;&#097;&#114;&#108;&#111;&#115;&#046;&#114;&#098;&#101;&#114;&#116;&#111;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
                  </a>
                  <br />
                  <a
                    href="https://github.com/carlosrberto/parallelogram-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    source code
                  </a>
                </p>
              {/* eslint-enable max-len */}
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.modalRootEl,
    ) : null;
  }
}

Modal.defaultProps = {
  open: false,
};

Modal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Modal;
