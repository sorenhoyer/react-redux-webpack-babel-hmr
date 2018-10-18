import { routerMiddleware } from 'react-router-redux';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createReducer from './createReducer';

export default function configureStore(initialState = {}, history) {
  /**
   * Based on the current environment variable, we need to make sure
   * to exclude any DevTools-related code from the production builds.
   * The code is envify'd - using 'DefinePlugin' in Webpack.
   */

  const middlewares = [routerMiddleware(history)];

  const storeEnhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('../containers/DevTools').default;

    // If the user has the "Redux DevTools" browser extension installed, use that.
    // Otherwise, hook up the in-page DevTools UI component.
    // const debugEnhancer = window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument();

    const debugEnhancer =
      typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__({
          // TODO: Try to remove or set to true (default is true) when `react-router-redux` is out of beta, LOCATION_CHANGE should 
          // not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: true,
        })
        : DevTools.instrument();
    storeEnhancers.push(debugEnhancer);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  storeEnhancers.unshift(middlewareEnhancer);

  const store = createStore(
    createReducer(),
    initialState,
    compose(...storeEnhancers)
  );

  store.injectedReducers = {}; // Reducer registry

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./createReducer', () => {
        alert("test")
        store.replaceReducer(createReducer(store.injectedReducers));
      });
    }
  }

  return store;
}