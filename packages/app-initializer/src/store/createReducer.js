import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

export default function createReducer(injectedReducers) {
  return combineReducers({
    routing: routerReducer,
    ...injectedReducers,
  });
}