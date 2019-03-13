import { combineReducers } from 'redux';
import { reducer as canvasReducer } from './canvas';

const rootReducer = combineReducers({
  canvas: canvasReducer,
});

export default rootReducer;
