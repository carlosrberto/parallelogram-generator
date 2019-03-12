const addPoint = (state, point) => {
  if(state.points.length < 3) {
    const points = [...state.points, point];
    const history = [...state.history.slice(0, state.historyIndex + 1), points];
    const historyIndex = history.length - 1;
    return {
      ...state,
      points,
      history,
      historyIndex,
    }
  } else {
    return state;
  }
}

const updatePoint =(state, index, value) => {
  if(state.points.length === 3 && index <= 2) {
    return {
      ...state,
      points: [
        ...state.points.slice(0, index),
        value,
        ...state.points.slice(index+1, state.points.length)
      ]
    }
  } else {
    return state;
  }
}

const undo = state => {
  return {
    ...state,
    point: state.history[state.historyIndex - 1],
    historyIndex: state.historyIndex - 1,
  }
}

const redo = state => {
  if(state.historyIndex + 1 <= state.history.length - 1) {
    return {
      ...state,
      point: state.history[state.historyIndex + 1],
      historyIndex: state.historyIndex + 1,
    }
  } else {
    return state;
  }
}

export const createStore = (initialState = {
  points: [],
  history: [],
  historyIndex: 0,
}) => {
  let state = initialState;
  let subscribers = [];
  const dispatch = (fn) => {
    const nextState = fn();
    subscribers.forEach(s => s(nextState));
  }

  return {
    addPoint: (point) => dispatch(() => state = addPoint(state, point)),
    updatePoint: (index, value) => dispatch(() => state = updatePoint(state, index, value)),
    undo: () => dispatch(() => state = undo(state)),
    redo: () => dispatch(() => state = redo(state)),
    subscribe: s => subscribers = [...subscribers, s],
    getState: () => state,
  }
}
