import {
  create,
  handler,
  getActions,
  getReducer,
} from 'reduxed';

const addPoint = (state, { point }) => {
  if (state.points.length < 3) {
    const points = [...state.points, point];
    const history = [...state.history.slice(0, state.historyIndex + 1), points];
    const historyIndex = history.length - 1;
    return {
      ...state,
      points,
      history,
      historyIndex,
    };
  }
  return state;
};

const updatePoint = (state, { index, value }) => {
  if (state.points.length === 3 && index <= 2) {
    return {
      ...state,
      points: [
        ...state.points.slice(0, index),
        value,
        ...state.points.slice(index + 1, state.points.length),
      ],
    };
  }
  return state;
};

const undo = state => ({
  ...state,
  point: state.history[state.historyIndex - 1],
  historyIndex: state.historyIndex - 1,
});

const redo = (state) => {
  if (state.historyIndex + 1 <= state.history.length - 1) {
    return {
      ...state,
      point: state.history[state.historyIndex + 1],
      historyIndex: state.historyIndex + 1,
    };
  }
  return state;
};

const counter = create(
  handler('addPoint', addPoint),
  handler('updatePoint', updatePoint),
  handler('undo', undo),
  handler('redo', redo),
)({
  points: [],
  history: [],
  historyIndex: 0,
}, {
  typePrefix: 'app/counter',
});

export const reducer = getReducer(counter);
export const actions = getActions(counter);
export const types = getActions(counter);
