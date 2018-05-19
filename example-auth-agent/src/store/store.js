import { combineReducers, createStore } from 'redux';

import app from '../app/AppReducer';

const reducers = combineReducers({
  app,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
