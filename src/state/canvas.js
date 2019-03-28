import {
  create,
  handler,
  getActions,
  getReducer,
  getTypes,
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

const updateHistory = (state) => {
  const history = [...state.history.slice(0, state.historyIndex + 1), state.points];
  const historyIndex = history.length - 1;
  return {
    ...state,
    history,
    historyIndex,
  };
};

const reset = (state) => {
  const nextState = updateHistory({
    ...state,
    points: [],
    showAllParallelogram: false,
  });
  return nextState;
};

const undo = (state) => {
  const historyIndex = state.historyIndex - 1;
  if (historyIndex >= 0) {
    return {
      ...state,
      points: state.history[historyIndex],
      historyIndex,
    };
  }
  return state;
};

const redo = (state) => {
  const historyIndex = state.historyIndex + 1;
  if (historyIndex <= state.history.length - 1) {
    return {
      ...state,
      points: state.history[historyIndex],
      historyIndex,
    };
  }
  return state;
};

const toggleAll = state => ({
  ...state,
  showAllParallelogram: !state.showAllParallelogram,
});

const counter = create(
  handler('addPoint', addPoint),
  handler('updatePoint', updatePoint),
  handler('updateHistory', updateHistory),
  handler('reset', reset),
  handler('toggleAll', toggleAll),
  handler('undo', undo),
  handler('redo', redo),
)({
  points: [],
  showAllParallelogram: false,
  history: [[]],
  historyIndex: 0,
}, {
  typePrefix: 'app/canvas',
});

export const reducer = getReducer(counter);
export const actions = getActions(counter);
export const types = getTypes(counter);
