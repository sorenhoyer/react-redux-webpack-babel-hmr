import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import createHistory from 'history/createBrowserHistory';
import injectReducer from './utils/injectReducer';

export const history = createHistory();
export const store = configureStore(history);

export const render = (RootDOMNode, App) => {
  ReactDOM.render(
    React.createElement(Root, { store, history, App }),
    RootDOMNode
  );
};

export {
  injectReducer,
}



