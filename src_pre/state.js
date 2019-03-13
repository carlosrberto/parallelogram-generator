

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
  };

  return {
    addPoint: point => dispatch(() => state = addPoint(state, point)),
    updatePoint: (index, value) => dispatch(() => state = updatePoint(state, index, value)),
    undo: () => dispatch(() => state = undo(state)),
    redo: () => dispatch(() => state = redo(state)),
    subscribe: s => subscribers = [...subscribers, s],
    getState: () => state,
  };
};
