//createStore
import { createStore, applyMiddleware, compose } from 'redux';
//middleware for Redux that allows us to directly access the dispatch method to make asynchronous calls from our actions
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  () => [],
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
