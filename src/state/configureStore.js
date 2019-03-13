import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './rootReducer';

export default function configureStore() {
  let middleware = [];

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middleware = [...middleware, logger];
  }

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

  // run HMR if enabled
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // enable HMR for Redux
    module.hot.accept('./rootReducer', () => {
      store.replaceReducer(reducers);
    });
  }

  return store;
}
